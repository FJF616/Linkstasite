import React, { Component } from 'react';
import '../App/App.css';
import { withRouter } from 'react-router-dom';
// import Navigation from '../Navigation';
import MediaGrid from '../MediaList/MediaGrid';
import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar';
// import withAuthentication from '../Session/withAuthentication'
import { base } from '../rebaseConfig/firebase'
class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      userProfile: [],
      accountName:'loading' 
    };
  }


  // componentDidMount() {
    // InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
    //       gallery: instagramUser.gallery,
    //       userProfile: instagramUser.user['0'],
    //       accountName: instagramUser.user['0'].userName,
          
    //     })).catch(error => {
    //       if (error) {
    //         console.log("error fetching instagramUser")
    //       }
    //   });
     

    componentWillMount() {
      this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery',
        asArray: true
    });
  }
    // componentWillUnMount() {
    //   base.removeBinding(this.galleryRef);
    // }

  render() {
    console.log(this.state.userProfile)
    console.log(this.galleryRef.context.state.gallery)
    const galleryFeed = this.galleryRef.context.state.gallery
    
    console.log(galleryFeed)
    return (
      <div className="App">
        
       <SideBar2/>
        <MediaGrid medias={galleryFeed}/>
      </div>
    );
  }
}

export default withRouter(GridView);
