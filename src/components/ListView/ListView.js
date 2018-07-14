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
import Graph from '../Graph/Graph'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
// import Graph from '../Graph/Graph'
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      // userProfile: [],
      slides:[],
      accountName:'loading',
      listView:''
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
    base.syncState('gallery', {
        context: this,
        state: 'gallery',
       
    });
   base.syncState('slides', {
      context: this,
      state: 'slides',
      
    });
  }
    updateGallery = (key, updatedKey) => {
      const gallery =  { ...this.state.gallery };
      gallery[key] = updatedKey;
      this.setState({ gallery });
    };
    // componentWillUnMount() {
    //   base.removeBinding(this.galleryRef);
    //   base.removeBinding(this.slidesRef)
    //  }
    
 
   MediaList = ({ gallery })  => {
      // const images = this.galleryRef.context.state.gallery;
      // this.setState({
      //   gallery: images
      // })
      
      return (
        <div className='list'>
      
          { 
          Object.keys(this.state.gallery).map((media, id) => {
              return <PhotoContainer  media={this.state.gallery[media]} key={media} />;
            })
          }
         
        </div>
      );
    }
    // console.log(this.state.userProfile)
    // console.log(this.galleryRef.context.state.gallery)
   
    render() {
    return (
      <div className="App" style={{display: 'inline-flex'}}>
        <Header/>
        <SideBar2/>
          {this.MediaList(this.state.gallery)}
        
      </div>
    );
  }
}

export default withRouter(ListView);
