import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import { base } from '../rebaseConfig/firebase';
/**
 * 
 * 
 * 
 * Context Provider gives access to instagram user imagegallery, and profile details
 */

export const InstagramConsumer = InstagramContext.Consumer;
export default class InstagramProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            gallery: '',
            userProfile: '',
            accountName: ''
        };
    }

/**
 * 
 * 
 * checks for empty Objects
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
  *  get the userProfile from firebase and extract the user details, if the userProfile object doesn't
  * exist get it from Instagram api
  */
    componentDidMount() {
        try {
            base.fetch('userProfile', {
            context: this,
            then(userProfile){
                if(!this.isEmpty(userProfile)) {
                this.setState({
                    userProfile: userProfile,
                    accountName: userProfile.userName
                });  
                console.log('successfully fetched user profile from firebase');
            } else {
                if(this.isEmpty(userProfile)) {
                    InstagramLogin.fetchUserInfo()
                        .then(instagramUser => this.setState({
                            gallery: instagramUser.gallery,
                            userProfile: instagramUser.user['0'],
                            accountName: instagramUser.user['0'].userName,    
                        }))
                        .catch(err => {
                            console.log('error fetching user profile from firebase', err);
                        })
                      }
                   }
                }
            });     
        } catch (error) {
            throw Error;
        }
    }
  
    render() {
        return (
            <InstagramContext.Provider  value={ this.state } >
                {this.props.children}
            </InstagramContext.Provider>
        );
    }
};