import React, { Component } from 'react';
import BitlyHeader from '../Header/BitlyHeader';
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
import MediaGrid from '../MediaList/MediaGrid'
import InstagramContext from '../Session/InstagramContext';

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
    this.removeGallery = this.removeGallery.bind(this); 
    
  }
  // makeGallery = () => {
  //   let newGallery ={};
  //   const newGalleryKeys = Object.keys(this.galleryRef.context.state.gallery).map(key => {
  //     const newKey  = this.state.gallery[key].id;
  //     newGallery[newKey]= this.state.gallery[key];
  //     return newGallery;
  // });
  // let updatedGallery = newGalleryKeys['0'];
  // return updatedGallery;  
  // }

  //  updateRebase =  () => {
  //       const updatedGallery = {...this.makeGallery()};
  //       this.setState({gallery: updatedGallery})
  //   }
    updateEachGallery = (key, updatedKey) => {
      const gallery =  { ...this.state.gallery };
      gallery[key] = updatedKey;
      this.setState({ gallery });
    };

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
  //  base.syncState('slides', {
  //     context: this,
  //     state: 'slides',
      
  //   });
  try {
    base.listenTo('affiliates', {
      context: this,
      then(data) {
        this.setState({ gallery: {...data} })
        }
      })
      throw new Error('Request failed!');
  } catch (error) {
      console.log(error);
    }
  this.removeGallery();
  this.updatedGalleryRef = base.syncState('updatedGallery', {
    context: this,
    state: 'updatedGallery',
  });
}
   
    componentWillUnMount() {
      base.removeBinding(this.galleryRef);
      base.removeBinding(this.slidesRef);
      base.removeBinding(this.updatedGalleryRef);
     }
    
     removeGallery() {
      const id = this.state.gallery.id;
      console.log(id)
     
        base.remove(`gallery/${id}`, function(err) {
            if(!err) {
                console.log('successfully updated gallery');
              }
          })
      }
  
   MediaLists = ({ gallery, updateGallery })  => {
      gallery = {...this.galleryRef.context.state.gallery};
      return (
        <div className='list'>
          { 
          Object.keys(gallery).map((media) => {
              return <PhotoContainer 
                        updateGallery={this.removeGallery} 
                        refresh={this.updateEachGallery}
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
 
    render() {
        return(
   
        <div className="App" style={{display: 'inline-flex'}}>
          <BitlyHeader/>
          <SideBar2/>
          {this.MediaLists(this.galleryRef.context.state.gallery)}
        </div> 
      );
    }
  }
export default withAuthentication(ListView);
