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
// import { Button } from 'react-bootstrap';
// import withInstagram from '../Session/withInstagram';
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: {},
      // userProfile: [],
      // slides:[],
      // accountName:'loading',
      // listView:''
    };
    
  }
 

  createGallery () {
    base.fetch('gallery', {
      context:this,
      then(data) {
        if(Object.keys(data).length > 1) {
        console.log('instagram user gallery found in firebase', data)
        } else {
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
      }
  })
}

  componentDidMount() {
    
    
    base.fetch('stripe', {
      context: this,
      then(data) {
        this.setState({
          stripeData: data
        })
      }
    })
    
      
    }

  componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
       context: this,
       state: 'gallery',
    
       
   });
}
deleteMedia = id => {
  id = this.galleryRef.context.state.gallery[id]
  this.setState(prevState => {
    return { gallery: prevState.gallery.filter(media => media.id !==id) };
  });
}; 
  
    MediaLists = ({ gallery})  => {
      gallery = {...this.galleryRef.context.state.gallery};
      return (
        <div key={gallery.id} className='list'>
          { 
          Object.keys(gallery).map((media) => {
              return (
                
                  <PhotoContainer 
                        stripeData={this.state.stripeData}
                        media={gallery[media]} 
                        key={gallery[media].id} 
                        id={gallery[media].id} 
                        title={gallery[media].title}
                        gallery={this.galleryRef}
                       />
                      
                  
                    )})
                    
                 }
                
            </div>
          );
      }
  
   componentWillUnMount() {
    base.removeBinding(this.galleryRef);
   
   }
   render() {
   return (
    <div className="App" style={{position: 'fixed', overflowY: 'scroll'}}>
    <Header/>
       <SideBar2 />
    <div className="list__view" style={{display: 'inline-flex', alignContent:'row'}} >
   
     
    
       
         {this.MediaLists(this.state.gallery)}
         </div>
     </div>
    
    );
  }
}

export default withAuthentication(ListView);
