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

/**
 * 
 * 
 * 
 * Component used to display each gallery image to be edited
 */
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
/**
 * 
 * 
 * 
 * 
 * copies the image gallery and uses each image id as the key instead of index numbers
 */

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
                };
            });
          }},
        });
      };

/**
 * 
 * 
 * 
 * get stripe info from firebase and put it into state
 */
  componentDidMount() {
    base.fetch('stripe', {
      context: this,
      then(data) {
        this.setState({
          stripeData: data
        });
      },
    });   
  }

/**
 * 
 * 
 * sync state with firebase gallery and update it with the gallery that we destructured with creategallery(),
 * with the destructuring, only the edited images will show up in gridview when gridview selected from the sidebar menu.
 * however since the landing page is listening for changes, it will show all the images including the ones not edited yet.
 * if it is desired to have the landing page reflect only the images that have been edited, then a new gallery will be needed in firebase
 * that is synced to the the gridview.
 */

  componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
       context: this,
       state: 'gallery'  
    });
  };

  deleteMedia = id => {
    id = this.galleryRef.context.state.gallery[id];
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
                );
            })};
          </div>
        );
      };
  
   componentWillUnMount() {
    base.removeBinding(this.galleryRef);
   };
   render() {
     const { MediaLists } = this.MediaLists;
     const { gallery } = this.state;
   return (
    <div 
      className="App" 
      style={{
        position: 'fixed', 
        overflowY: 'scroll'
      }}
      >
      <Header/>
      <SideBar2 />
      <div 
        className="list__view" 
        style={{
          display: 'inline-flex', 
          alignContent:'row'
        }} 
      >
      { MediaLists(gallery) }
    </div>
    </div>
    );
  }
}

export default withAuthentication(ListView);
