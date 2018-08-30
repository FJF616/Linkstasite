import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import { base } from '../rebaseConfig/firebase';
import { withRouter } from 'react-router-dom';
// import { extendObservableObjectWithProperties } from '../../../node_modules/mobx/lib/internal';

/**
 * 
 * 
 * 
 * HOC for quick access to settings. context Provider gives access to instagram user imagegallery, and profile details
 */

const withInstagram = (Component)  => {
 class WithInstagramProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            // instagramImages: {},
            proGallery:{},
            userProfile: {},
            accountName: '',
            
            firstLogin:'',
            // accessToken:'' ,
            gallery:[]    
        };
    }
/**
 * 
 * checks for empty objects
 */

getData = async () => {
    await base.fetch('userProfile', {
      context: this,
    })
    .then((data) => {
        this.setState({ userProfile: data })
        const { userProfile } = this.state;
          if (userProfile.hasOwnProperty('proSubscription') || userProfile.proSubscription === true) {
            this.setState({accountStatus: 'pro'})  
          }
    })
  }

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
 * fetch first 6 images from instagram gallery and set userprofile turn first login flag to false
 */
    // trialGallery() {
    //     InstagramLogin.fetchUserInfo()
    //     .then(instagramUser => this.setState({
    //         instagramImages: instagramUser.gallery,
    //         userProfile: instagramUser.user['0'],
    //         accountName: instagramUser.user['0'].userName,
    //         firstLogin: false    
    //     }))
    //     .then((userProfile) => {
    //         userProfile = {...this.state.userProfile}
    //         if (userProfile.proSubscription) {
    //             this.getPro();
    //         }
    //     })
        
    // }
    checkIfNeedToDownload2 = () => {
        // if (window.InstAuth.accessToken && this.state.instagramImages.length === 0) {
          this.setState({ isDownloadingImages: true });
          InstagramLogin.login(6)
            .then((images) => {
              this.setState({
                instagramImages: images.data,
                isDownloadingImages: false,
                paginationUrl: images.pagination
                  ? images.pagination.next_url
                  : null,
              })
            })
            .catch((error) => {
              console.error(error);
              this.setState({ isDownloadingImages: false });
            });
        // }
      };
    
    checkIfNeedToDownload = () => {
        if ( this.isEmpty(this.state.userProfile) ||  Object.keys(this.state.userProfile.length === undefined)) {
          try {
              base.fetch('userProfile', {
                  context: this,
                  state: 'userProfile',
                })
                .then(userProfile => {
                  if (Object.keys(userProfile).length) {
                      this.setState({ userProfile })
                    } else {
                        this.setState({ isDownloadingImages: true });
                        InstagramLogin.getUserMedia(6)
                            .then((instagramUser) =>
                              this.setState({
                                instagramUser,
                                gallery: instagramUser.user.gallery,
                                userProfile: instagramUser.user,
                                accountName: instagramUser.user.userName,
                                isDownloadingImages: false,
                                accessToken: instagramUser.user.accessToken,
                                paginationUrl: instagramUser.user.pagination
                                ? instagramUser.user.pagination.next_url
                                : null,
                            }))
                            .catch((error) => {
                              console.error(error);
                              this.setState({ isDownloadingImages: false });
                            }); 
                        }
                    })
                } catch (error) {
                    throw Error
                };
            }
        } 

    /**
     * 
     * 
     * 
     * 
     * check for account status through the firebase stored profile, if not found, this must be first time logging in
     * if not, check if the user has pro subscription, then retrieve the progallery and set it to state
     */
    checkIfPro = () => {
        base.fetch('userProfile', {
            context: this,
           
        })
        .then(userProfile => {
            this.isEmpty(userProfile) 
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
                if(this.isEmpty(this.state.userProfile)) {
                    this.getData();
                    }
                if(!this.isEmpty(this.state.gallery) && !this.isEmpty(this.state.userProfile)) {
                    this.getPro();
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
            this.galleryRef = base.syncState('gallery', {
                context: this,
                state: 'gallery',
               
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
        // InstagramLogin.getUserMedia(20)
        // .then((instagramUser) =>
        //   this.setState({
        //     gallery: instagramUser.user.gallery,
        //     userProfile: instagramUser.user,
        //     accountName: instagramUser.user.userName,
        //     isDownloadingImages: false,
        //     accessToken: instagramUser.user.accessToken,
        //     paginationUrl: instagramUser.pagination
        //       ? instagramUser.user.pagination.next_url
        //       : null,
        //   }))
        // .catch((error) => {
        //   console.error(error);
        //   this.setState({ isDownloadingImages: false });
        // });
        
           
    //  this.checkFirstLogin()
    //  this.checkIfPro();
     this.isFirstLogin();  
    }
       

    componentWillUnmount() {
        base.removeBinding(this.galleryRef);
    }
  
    render() {
        
        return (
            <InstagramContext.Provider  value={this.state} >
                <InstagramContext.Consumer >
                 { (value) => <Component {...this.props.children} gallery={value.gallery}  userProfile={value.userProfile}/> }
                </InstagramContext.Consumer>
            </InstagramContext.Provider>
        );
    }
  }
  return withRouter(WithInstagramProvider);
}
export default withInstagram;