import React, {Component} from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import { base } from '../rebaseConfig/firebase';
import { withRouter } from 'react-router-dom';
/**
 * 
 * 
 * 
 * Context Provider gives access to instagram user imagegallery, and profile details
 */

const withInstagram = (Component)  => {
 class WithInstagramProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            trialGallery: {},
            proGallery:{},
            userProfile: {},
            accountName: '', 
            firstLogin: true     
        };
    }
/**
 * 
 * checks for empty objects
 */



    isEmpty = (obj) =>  {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({}); //should return true if empty object
    }   
/**
 * 
 * 
 * 
 * check for empty state objects and set flag for firstlogin
 */

    checkFirstLogin() {
      (typeof this.state.gallery === undefined || typeof this.state.proGallery === undefined || typeof this.state.userProfile === undefined) 
            ? this.setState({ firstLogin : true }) 
            : this.setState({ firstLogin: false })
            return this.state.firstLogin;
    } 
/**
 * 
 * 
 * 
 * 
 * fetch first 6 images from instagram gallery and set userprofile turn first login flag to false
 */
    trialGallery() {
        InstagramLogin.fetchUserInfo()
        .then(instagramUser => this.setState({
            trialGallery: instagramUser.gallery,
            userProfile: instagramUser.user['0'],
            accountName: instagramUser.user['0'].userName,
            firstLogin: false    
        }))
        .catch(err => {
            console.log('error fetching user profile from instagram', err);
        })
    }

    /**
     * 
     * 
     * 
     * 
     * fetch the maximum amount of instagram images (for pro subscription)
     */
    getPro() {
        InstagramLogin.getProGallery().then(proGallery =>  this.setState({ proGallery }))
    }

    /**
     * 
     * 
     * 
     * 
     * check for account status through the firebase stored profile, if not found, this must be first time logging in
     * if not, check if the user has pro subscription, then retrieve the progallery and set it to state
     */
    checkIfPro() {
        base.fetch('userProfile', {
            context: this,
        })
        .then(userProfile => {
            typeof userProfile === undefined 
            ? this.setState({ firstLogin: true })
            : this.setState({
                    userProfile: userProfile,
                    accountName: userProfile.userName
                });
                if (this.state.userProfile.proSubscription) { 
                    return  this.getPro();
                }  
            })
            .catch(err => {
                console.log('error getting user profile from firebase', err)
        })
        console.log('successfully fetched user profile from firebase');
    }
/**
 * 
 * 
 * 
 * check for pro account subscription in firebase, and make sure local state is reflects the same thing
 * 
 */
    isFirstLogin() {
        try {
            if(this.isEmpty(this.state.gallery) && this.isEmpty(this.state.userProfile)) {
                this.trialGallery();
                } else {
                   this.checkIfPro();
                }
            } catch (error) {
                throw Error;
            }
        }  
/**
 * 
 * store the full instagram gallery in local state (to be combined with trial gallery then uploaded to firebase later)
 */  
    componentWillMount() {
            this.proGalleryRef = base.syncState('proGallery', {
                context: this,
                state: 'proGallery',
                asArray:true
            })
        }
        
    /**
 * 
 * 
 * 
 */
    
 /**
  * 
  * 
  *  get the userProfile from firebase and extract the user details, if the userProfile object doesn't
  * exist get it from Instagram api
  */
    componentDidMount() {
        this.checkFirstLogin() 
        ? this.isFirstLogin()
        : this.checkIfPro() 
    }

    componentWillUnmount() {
        base.removeBinding(this.proGalleryRef);
    }
  
    render() {
        
        return (
            <InstagramContext.Provider  value={this.state} >
                <InstagramContext.Consumer >
                { (trialGallery, proGallery, userProfile, userName) => 
                    <Component 
                       
                        
                        proGallery={proGallery}
                        userProfile={userProfile}
                        userName={userName} 
                      />
                    }
                </InstagramContext.Consumer>
                
            </InstagramContext.Provider>
        );
    }
  }
  return withRouter(WithInstagramProvider);
}
export default withInstagram;