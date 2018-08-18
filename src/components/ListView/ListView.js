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
 * sync state with firebase gallery and set the gallery in state, do not pull it in as an array because we will destructure to rename the keys
 * this will be done with MediaLists method 
 * 
*/
  componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
      context: this,
      state: 'gallery'  
    });
  };
/**
 * 
 * 
 * 
 * 
 * copies the image gallery and uses each image id as the key instead of index numbers,
 * we do this so that the mediagridcomponent can reference these keys from the media prop id.
 * this allows the grid view to only display the images that have been edited.  this will
 * let us display to our guest as well, only the images we have put affiliate links on.
 * There is probably a more efficient way to do this so  lets just put a reminder for that:
 * *******reminder*******
 * TODO- find a better way to create a shared gallery that reflects changes to images as 
 * well as displays only those images and not ones that haven't been edited yet.
 * 
 * NOTE: since we have created the Instagram HOC we most likely can refactor this whole component further.
 * check the HOC for anything we can use here before refactoring this component or this method below.
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
 * get stripe info from firebase and put it into state, this will be used as a way for the mediagridcomponent
 * to determine whether or not a user has upgraded to pro.  if the user has no stripe data or the stripe data
 * comes back as an empty object, then the mediagridcomponent will know to place a click limit on the affiliate link
 */
  componentDidMount() {
    this.createGallery().then(() => {
    base.fetch('stripe', {
      context: this,
      then(data) {
        this.setState({
          stripeData: data
        });
      },
    }); 
  })
  .catch(err => {
    console.log('no user info found in database. please log into instagram to retrieve image gallery', err)
  })
  }



  deleteMedia = id => {
    id = this.galleryRef.context.state.gallery[id];
    this.setState(prevState => {
      return { gallery: prevState.gallery.filter(media => media.id !==id) };
    });
  }; 
  
/**
 * 
 * 
 * makes copy of gallery that is synced to state/firebase, and feeds the images to PhotoContainer 
 * this allows the user to edit each instagram image.  
 * 
 */

  MediaLists = ({ gallery, proSubscription })  => {
    gallery = {...this.galleryRef.context.state.gallery};
    proSubscription = this.state.stripeData.stripe.proSubscription;
    return (
      <div key={gallery.id} className='list'>
        { 
        Object.keys(gallery).map((media) => {
            return (             
                <PhotoContainer 
                  proSubscription={proSubscription}
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
