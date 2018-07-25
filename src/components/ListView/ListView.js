import React, { Component } from 'react';
import BitlyHeader from '../Header/BitlyHeader';
import '../App/App.css';
import { withRouter } from 'react-router-dom';
// import Navigation from '../Navigation';
// import MediaList from '../MediaList/MediaList.js';
// import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar2';
// import withAuthentication from '../Session/withAuthentication'
import { base } from '../rebaseConfig/firebase'
// import Graph from '../Graph/Graph'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
import withAuthentication from '../Session/withAuthentication'
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
    this.galleryRef = base.syncState('gallery', {
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
    
 
   MediaLists = ({ gallery })  => {
      // const images = this.galleryRef.context.state.gallery;
      // this.setState({
      //   gallery: images
      // })
      gallery = {...this.galleryRef.context.state.gallery};
      return (
        <div className='list'>
      
          { 
          Object.keys(gallery).map((media) => {
              return <PhotoContainer  media={gallery[media]} key={gallery[media].id} />;
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
        <BitlyHeader/>
        <SideBar2/>
          {this.MediaLists(this.galleryRef.context.state.gallery)}
        
      </div>
    );
  }
}
export default withAuthentication(ListView);
