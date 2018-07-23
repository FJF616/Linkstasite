import React from 'react';
import InstagramContext from './InstagramContext';
import InstagramLogin from '../../util/InstagramLogin';
import Media from '../Media/Media';

export const InstagramConsumer = InstagramContext.Consumer;
export default class InstagramProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            gallery: [],
            userProfile: [],
            listView: null,
            accountName: ''
        };
    }

    componentDidMount() {
        InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
            gallery: instagramUser.gallery,
            userProfile: instagramUser.user['0'],
            accountName: instagramUser.user['0'].userName,
        }));
    }
    // getMedias = (mediasResult) => (
    //     this.state.mediasResult.map(media => {
    //         return  (           
    //             <Media media={media} key={media.id} />
    //     )})
    // );
    render() {
        const { gallery, userProfile, accountName } = this.state;
        return (
            <InstagramContext.Provider  value={{ gallery, userProfile, accountName }} >
                {this.props.children}
            </InstagramContext.Provider>
        );
    }
};