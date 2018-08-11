import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
// import Media from '../Media/Media';
import { base } from '../rebaseConfig/firebase';

export const InstagramConsumer = InstagramContext.Consumer;
export default class InstagramProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            // gallery: [],
            userProfile: [],
            accountName: ''
        };
    }

    componentDidMount() {
        try {
            base.fetch('userProfile', {
            context: this,
            state: 'userProfile',
            // asArray: true,
        })
        .then(userProfile => {
            this.setState({
                userProfile: userProfile,
                accountName: userProfile.userName
            })
            console.log('successfully fetched user profile from firebase')
        })
        .catch(error => {
            console.log('error fetching user profile from firebase', error)
        })
    } catch (error) {
        if(error) {
            InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
                // gallery: instagramUser.gallery,
                userProfile: instagramUser.user['0'],
                accountName: instagramUser.user['0'].userName,
                proSubscription: false
            }))
            .catch(error => {
                console.log('error fetching instagram profile');
            });
        }else {
            console.log('error', error);
        }   
    }
  }
    render() {
        // const { userProfile, accountName } = this.state;
        return (
            <InstagramContext.Provider  value={ this.state } >
                {this.props.children}
            </InstagramContext.Provider>
        );
    }
};