import React, { Component } from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
// import ICONS from '../Icons/constants';
// import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
import ReactTooltip from 'react-tooltip';
import { Button } from 'react-bootstrap';
import Icon from '../Icons/Icon';
import ICONS from '../Icons/constants';

// import ProgressBar from '../Graph/ProgressBar';
// import { withRouter } from 'react-router-dom'
// import Bar from '../Graph/Bar'
export default class MediaGridComponent extends Component { 
  state = {
    completed: false,
    stats: {
      link: '',
      clicks: 0,
    },
    galleryImage:{},
  }
  transferImage = () => {
    const editedImage  = {...this.state.galleryImage}
    const key = this.props.media.id
    this.editedImagesRef.update(`editedImages/${key}`, {
      data: { editedImage },
      then(err) {
        if(!err) {
          console.log('transferred image')
        }
      }
    })

  } 
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * setup listeners for images being edited in listview, only display images that are edited and then
 * send the edited Images to their own firebase database that the  landing page will be listening to 
 * so that the landing page will only display the images that have affiliate links etc which we can
 * eventually use in our guest gallery / final view that we want to show to outside world.
 */
// updateGallery = () => {
//   const { editedImages } = this.state;
//   base.post(`editedImages/${this.props.media.id}`, {
//     data: { editedImages },
//   })
// }
/**
 * 
 * 
 * 
 * creates a duplicate gallery of only edited images
 */
checkAffiliates = () => {
  base.fetch(`gallery/${this.props.media.id}`, {
    context: this,
    then(fetchData) {
      this.setState({ galleryImage: fetchData })
     if( fetchData.hasOwnProperty('affiliated') && fetchData.affiliated !== false) {
        base.post(`images/${this.props.id}`, { data:  fetchData })
        return
      } else {
       console.log('no affiliate link found for this image!');
      }
    }
  });
}


componentWillMount() {
  this.statsRef = base.syncState('stats', {
    context: this,
    state: 'stats'
  });
};

componentDidMount() {
  this.checkAffiliates();
}


componentWillUnmount() {
  base.removeBinding(this.statsRef);
  // base.removeBinding(this.editedRef);
  // base.removeBinding(this.editedImagesRef);
}

/**
 * 
 * 
 * 
 * 
 * report back to firebase the number of clicks any new or previously used affiliate link has
 */
// updateClicks = () => {
//   const { stats } = this.state;
  
//   // base.post(`stats/${this.props.media.id}`, {
//   //   data: { clicks: clicks,  link: url},
//   //   then(err) {
//   //     if(!err){
//   //       console.log('success tracking clicks', clicks)
//   //     }
//   //   }
//   // })
// }
// removeImage = (id) => {
//   const { newState } = this.state;
//   const index = newState.findIndex(media => media.id === id);
  
//   if (index === -1) return;
//   newState.splice(index, 1);

//   this.setState({ gallery: newState });
// }
/**
 * 
 * 
 * 
 * Removes image media from main gallery
 */
updateGallery = (key, id) => {
  id = this.props.media.id;
  base.remove(`gallery/${id}`)
    .then((id) => {
      alert('media has been permanently deleted', id)
    })
    .catch(error =>{
      console.log('error updating media gallery')
    });
  }
/**
 * 
 * 
 * 
 * removes image media from current gallery 
 */
deleteMedia = (key, id) => {
  // id = this.state.gallery[key].id
  this.setState(prevState => {
    return { galleryImage: Object.keys(prevState.galleryImage).filter(media => media.id !== id) };
  });
};

/**
 * 
 * 
 * 
 * permanently Removes image media from state, then from firebase galleries. 
 */

removeMedia = (key, id) => {
  id = this.props.media.id;
  base
  .remove(`images/${id}`)
  .then((id) => {
    this.deleteMedia(id)
  }).then((id) => {
    this.updateGallery(id)
  })
  .catch(error => {
   console.log('error deleting from firebase', error)
  });
}
/**
 * 
 * 
 * check the number of clicks any associated affiliate link has for the current image
 */
// getClicks= () => {
//   base.fetch(`gallery`,{
//     context: this,
//     asArray: true,
//     then(data){
//       console.log(data);
//     }
//   })
// }

/**
 * 
 * if the user has trial subscription affiliate links are limited to 30 clicks and then the click limit restriction is
 * enforced.  if the subscription is pro subscription, this limit is lifted.  images that have a clickable affiliate link
 * will have a gold border and the cursor hovers with pointer.  otherwise they will have a pink colored border and won't be 
 * clickable, but the title will still be displayed and a tool tip will give notification to upgrade when hovered.
 */

render() {
  const { galleryImage } = this.state;
  const { media } = this.props;
  /**
   * 
   * 
   * 
   * this view is for images that have reached the click limit during trial subscription
   */
  return (
      <div className='image-grid' >
      
        {((  galleryImage.url && galleryImage.clicks === '30') &&  (this.state.completed  &&  galleryImage.url  ))
          ? <div>
              <span className="media-title">{galleryImage.title}</span>
                  <Imager   
                      data-tip="upgrade to pro for unlimited clicks"  //notification that shows when click limit is reached, each time cursor hovers over image
                      className="mr-3" src={galleryImage.src} 
                      style={{
                          width: '225px', 
                          height: '225px', 
                          margin: '10px', 
                          border: '7px ridge', 
                          padding: '5px',  
                          boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', 
                          borderColor: 'pink'          //image will no longer have gold border
                        }} 
                      />
              {/*<ReactTooltip 
                place="top" 
                type="light" 
                effect="float"
              /> */}
             </div> 
      : ( galleryImage.filled || galleryImage.clicks < '30' ) && ( this.state.galleryImage.id)
          /**
           * 
           * 
           * this view is for images that haven't reached the click limit or for images that have valid affiliate link 
           * the clicksRemaining props method will keep track of how many clicks are left until the affiliate link is disabled 
           * for trial subscription.  This will be displayed in the edit view/listview component when the link preview is not
           * turned on. 
           */
      ?   <div className = "image-grid"  onClick={this.updateClicks}>
             
                  <Button 
                  // className="remove-btn"
                  type="button"
                  style={{width: 35, height: 35,  marginTop: 175, marginLeft: 15, padding: 2, position: 'absolute', backgroundColor: 'transparent'}}
                  onClick={() =>
                    this.removeMedia(this.props.media.id)
                  }
                >
                <Icon   
                  className="trash__icon"  
                  icon={ICONS.BIN3} 
                  color={"white"} 
                  size={85} 
                />
                </Button>
                <span className="media-title">
                <h5>{galleryImage.title}</h5> </span>
                <a href={galleryImage.url} >
                  <Imager  
                      data-tip={galleryImage.url} 
                      className="mr-3" 
                      src={media.src} 
                      style={{
                          width: '225px', 
                          height: '225px',
                          margin: '10px', 
                          border: '7px ridge', 
                          padding: '5px',  
                          boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', 
                          borderColor: 'gold'  // all valid clickable images with affiliate link will have gold border
                        }} 
                      />
                  </a>
                
              
              <ReactTooltip 
                place="top" 
                type="light" 
                effect="float"
                      /> 
          </div>
                    
      :null
      }
      </div>   
      );
    }
  }

 