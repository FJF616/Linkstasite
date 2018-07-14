import React, { Component } from 'react';
import Header from '../Header/Header';
import '../App/App.css';
import { withRouter } from 'react-router-dom';
// import Navigation from '../Navigation';
// import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar2';
// import withAuthentication from '../Session/withAuthentication'
import { base } from '../rebaseConfig/firebase'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
// import Graph from '../Graph/Graph'
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      // userProfile: [],
      slides:[],
      accountName:'loading' 
    };
  }


  // componentDidMount() {
  //   InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
  //         gallery: instagramUser.gallery,
  //         userProfile: instagramUser.user['0'],
  //         accountName: instagramUser.user['0'].userName,
          
  //       })).catch(error => {
  //         if (error) {
  //           console.log("error fetching instagramUser")
  //         }
  //     });
  //   }

    componentWillMount() {
     this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery',
        asArray: true
    });
   this.slidesRef = base.syncState('slides', {
      context: this,
      state: 'slides',
      
    });
  }
    componentWillUnMount() {
      base.removeBinding(this.galleryRef);
      base.removeBinding(this.slidesRef)
     }
    
 
   MediaList = ({ gallery })  => {
      const images = this.galleryRef.context.state.gallery;
      return (
        <div className='list'>
      
          { 
            images.map(media => {
              return <PhotoContainer  media={media} key={media.id} />;
            })
          }
         
        </div>
      );
    }
    // console.log(this.state.userProfile)
    // console.log(this.galleryRef.context.state.gallery)
   
    render() {
    return (
      <div className="App">
        <Header/>
        <SideBar2/>
          {this.MediaList(this.state.gallery)}
      </div>
    );
  }
}

export default withRouter(ListView);
