import React, { Component } from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
// import ICONS from '../Icons/constants';
// import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
import ReactTooltip from 'react-tooltip';
// import ProgressBar from '../Graph/ProgressBar';
// import { withRouter } from 'react-router-dom'
// import Bar from '../Graph/Bar'
export default class MediaGridComponent extends Component { 
  state = {
    completed: false,
    stats: {
      link: '',
      clicks: 0,
    
    }
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

componentWillMount() {
  this.statsRef = base.syncState('stats', {
    context: this,
    state: 'stats'
  });
  this.galleryRef = base.syncState(`gallery/${this.props.media.id}`, {
    context: this,
    state:'gallery',
    // asArray: true
  });
  this.editedImagesRef = base.syncState('editedImages', {
    context: this,
    state: 'gallery'
  });
};

  

componentWillUnmount() {
  base.removeBinding(this.statsRef);
  base.removeBinding(this.galleryRef);
  base.removeBinding(this.editedImagesRef);
}

/**
 * 
 * 
 * 
 * 
 * report back to firebase the number of clicks any new or previously used affiliate link has
 */
updateClicks = () => {
  const { clicks } = this.state.gallery;
  base.post(`gallery`, {
    data: { clicks: clicks},
    then(err) {
      if(!err){
        console.log('success tracking clicks')
      }
    }
  })
}

/**
 * 
 * 
 * check the number of clicks any associated affiliate link has for the current image
 */
getClicks= () => {
  base.fetch(`gallery`,{
    context: this,
    asArray: true,
    then(data){
      console.log(data);
    }
  })
}

/**
 * 
 * if the user has trial subscription affiliate links are limited to 30 clicks and then the click limit restriction is
 * enforced.  if the subscription is pro subscription, this limit is lifted.  images that have a clickable affiliate link
 * will have a gold border and the cursor hovers with pointer.  otherwise they will have a pink colored border and won't be 
 * clickable, but the title will still be displayed and a tool tip will give notification to upgrade when hovered.
 */

render() {
  const { gallery } = this.state;
  const { media } = this.props;
  /**
   * 
   * 
   * 
   * this view is for images that have reached the click limit during trial subscription
   */
  return (
      <div className='image-grid' >
        { (( !gallery.affiliated || this.state.completed ) && ( gallery.url && gallery.clicks >= '30' ))
          ? <div>
              <span className="media-title">{gallery.title}</span>
                  <Imager   
                      data-tip="upgrade to pro for unlimited clicks"  //notification that shows when click limit is reached, each time cursor hovers over image
                      className="mr-3" src={media.src} 
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
              <ReactTooltip 
                place="top" 
                type="light" 
                effect="float"
                />
            </div> 
      : ( gallery.filled || gallery.clicks < '30' )
      
          /**
           * 
           * 
           * this view is for images that haven't reached the click limit or for images that have valid affiliate link 
           * the clicksRemaining props method will keep track of how many clicks are left until the affiliate link is disabled 
           * for trial subscription.  This will be displayed in the edit view/listview component when the link preview is not
           * turned on. 
           */
      ?   <div className = "image-grid"  onClick={this.props.clicksRemaining}>
              <span className="media-title">
                  <h5>{gallery.title}</h5> </span>
                  <a href={gallery.url} >
                  <Imager  
                      data-tip={gallery.url} 
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
      :''
      }
      </div>   
      );
    }
  }

 