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
            listView: false,
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
        return (
            <InstagramContext.Provider  value={{ state: this.state}} >
                {this.props.children}
            </InstagramContext.Provider>
        );
    }
};