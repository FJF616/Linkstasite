import React, { Component } from 'react';
import Carousel from 'react-responsive-carousel';
import InstagramLogin from '../../util/InstagramLogin'
export default class LazyLoadedCarousel extends Component {
    constructor (props) {
        super(props);

        this.state = {
            slides:''
        };

        this.loadSlides = this.loadSlides.bind(this);
    }

    loadSlides() {
    //    InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
    //        slides: instagramUser.slides
    //    }));
    this.setState({
        slides: baseChildren.props.children
    })
    }
    render() {
        return (
            <div>
                <button onClick={this.loadSlides}>Load slides</button>
                <Carousel>
                    { this.state.slides }
                </Carousel>
            </div>
        );
    }
}