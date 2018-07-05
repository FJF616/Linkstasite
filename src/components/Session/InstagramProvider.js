import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import Media from '../Media/Media';

export const InstagramConsumer = InstagramContext.Consumer;
export default class InstagramProvider extends React.Component {
    state = {
        linkstasite: [],
        userProfile: {},
        accountName: ''
    }
    componentDidMount() {
        InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
            linkstasite: instagramUser,
            // userProfile: instgramUser.user,
            // accountName: instagramUser['0'].userName,
        }));
      }
    getMedias = (mediasResult) => (
        this.state.mediasResult.map(media => {
            return  (           
                <Media media={media} key={media.id} />
        )})
    );
    render() {
        return (
            <InstagramContext.Provider  
                value={{ 
                    state: this.state
                }} 
              >
                {this.props.children}
            </InstagramContext.Provider>
        );
    }
};