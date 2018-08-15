import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import { base } from '../rebaseConfig/firebase';

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

    isEmpty = (obj) =>  {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

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