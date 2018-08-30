import React, { Component } from 'react';
// import { Card } from '@material-ui/core';
import '../App/App.css';
import withAuthentication from '../Session/withAuthentication';

import SideBar2 from '../SideBar/SideBar2';
// import MediaGrid from '../MediaList/MediaGrid';
import MediaGridComponent from '../Media/MediaGridComponent'
import { base } from '../rebaseConfig/firebase'
import Header from '../Header/Header';
class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      stripeData: {}
      // userProfile: [],
   
    };
    // this.onListChange = this.onListChange.bind(this);
    // this.deleteMedia = this.deleteMedia.bind(this); 
  }


    // onListChange (id, updatedList) {
    //   const { gallery } = this.state;
      
    //   this.setState({
    //     gallery: Object.keys(gallery).map(medias => {
    //       if (medias.id !== id) return medias;
          
    //       return {
    //         ...medias,
    //         gallery: updatedList
    //       };
    //     })
    //   });
    // }

     // removeFromGallery(media) {
    //   const gallery = {...this.state.gallery};
    //   delete gallery[media];
    //   this.setState({ gallery });
    // }
    
   

    //  renderMediaList = media =>
    //  <MediaGrid key={media.id} media={media} onClick={this.deleteMedia} />
    componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery',
        // asArray: true
        
    });
   
  }
  componentDidMount() {
    base.fetch('stripe', {
      context:this,
      then(data) {
        this.setState({
            stripeData: data
        })
      }
    })
    // base.syncState('editedImages', {
    //   context: this,
    //   state: 'gallery'
    // })
  }
  clicksRemaining = (limit) => {
    limit =  limit > '0' ? limit : '100';
    const clicks = this.state.gallery.clicks;
    const remaining = limit - clicks;
    switch(remaining) {
     case '10' :
     case '5': 
       alert('There are 10 clicks remaining for your trial period. Upgrade to Pro subscription and receive unlimited clicks as well as access to the entire instagram gallery.')
       break;
     case '0': 
       alert('You have reached the limit of clicks for this affiliate link. You may continue to use the service with a different link, however, all links are limited to 25 clicks and may not be reused.')
       break;
     default:
       return remaining; 
   }
   return this.setState({
         clicksRemaining: remaining > '0' ? remaining : remaining === '0' ? 'completed' : remaining,
     })
  }
  deleteMedia = id => {
    id = this.state.gallery[id]
    this.setState(prevState => {
      return { gallery: prevState.gallery.filter(media => media.id !==id) };
    });
  };

  MediaLists = ({ gallery, deleteMedia })  => {
    gallery = {...this.galleryRef.context.state.gallery};
    return (
      <div key={gallery.key} className='list'>
        { 
        Object.keys(gallery).map((media) => {
            return <MediaGridComponent 
                      proSubscription={this.state.stripeData.proSubscription || false}
                      clicksRemaining={this.clicksRemaining}
                      // updateGallery={this.removeGallery} 
                      remove={this.removeImage}
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

    componentWillUnMount() {
      base.removeBinding(this.galleryRef);
    }
   
  render() {
   
    return (
      <div className="App"> 
      <Header />
       <SideBar2/>
       <div  >
      <h3><b>Image Gallery</b></h3>
      <ul>
      <li>Images with affiliate links and titles will appear in this gallery</li>
      <li><b>Deleting images will permanently remove the image from gallery</b></li>
      <li>You may test each affiliate link</li>
      <li>You may unlink and reuse images at anytime in edit mode</li>
      <li>Trial Subscriptions are limited to 100 clicks per affiliate link and 6 images max.</li>
      <li>Pro Subscritpitons have unlimited clicks per link and may access 20 images max.</li>
      </ul>
    
      {this.MediaLists(this.state.gallery)}
      </div>
      </div>
    );
  }
  

}
export default withAuthentication(GridView);
