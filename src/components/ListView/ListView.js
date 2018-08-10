import React, { Component } from 'react';
// import BitlyHeader from '../Header/BitlyHeader';
import Header from '../Header/Header';
import '../App/App.css';
import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar2';
import { base } from '../rebaseConfig/firebase'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
import withAuthentication from '../Session/withAuthentication'
// import ICONS from '../Icons/constants';
// import Icon from '../Icons/Icon';
// import Graph from '../Graph/Graph'
// import MediaGrid from '../MediaList/MediaGrid'
// import InstagramContext from '../Session/InstagramContext';
// import Bar from '../Graph/Bar'

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: {},
      // userProfile: [],
      slides:[],
      accountName:'loading',
      listView:''
    };
    
  }
 


 
  
  
  componentDidMount() {
    InstagramLogin.fetchUserInfo().then(instagramUser => {
      let newGallery ={};
      const newGalleryKeys = Object.keys(instagramUser.gallery).map(key => {
      const newKey  = instagramUser.gallery[key].id;
      newGallery[newKey]= instagramUser.gallery[key];
      return newGallery;
    });
      let updatedGallery = newGalleryKeys['0'];
      this.setState({
        gallery: updatedGallery,
        slides: instagramUser.slides,
        userProfile: instagramUser.user['0'],
        instagramUserID: instagramUser.user.instagramUserID
      });  
    })
    .catch(error => {
          if (error) {
            console.log("error fetching instagramUser")
          }
      });
      
    }

  componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
       context: this,
       state: 'gallery',
       
   });
  this.slidesRef = base.syncState('slides', {
     context: this,
     state: 'slides',
     
   });
 
}
 
  
    MediaLists = ({ gallery})  => {
      gallery = {...this.galleryRef.context.state.gallery};
      return (
        
        <div key={gallery.id} className='list'>
        

          { 

          Object.keys(gallery).map((media) => {
              return <PhotoContainer 
                        // updateGallery={this.removeGallery} 
                        // refresh={this.updateEachGallery}
                        media={gallery[media]} 
                        key={gallery[media].id} 
                        id={gallery[media].id} 
                        title={gallery[media].title}
                        gallery={this.galleryRef}
                       />;
                       
                    })
                   
                 }
                
            </div>
          );
      }
   // console.log(this.state.userProfile)
   // console.log(this.galleryRef.context.state.gallery)
   componentWillUnMount() {
    base.removeBinding(this.galleryRef);
    base.removeBinding(this.slidesRef);
   }
   render() {
   return (
     <div className="App">
    
       <Header/>
       <SideBar2/>
         {this.MediaLists(this.state.gallery)}
        
     </div>

    );
  }
}

export default withAuthentication(ListView);
