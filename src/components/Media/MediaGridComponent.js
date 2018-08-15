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

componentWillMount() {
  this.statsRef = base.syncState('stats', {
    context: this,
    state: 'stats'
  })
  this.galleryRef = base.syncState(`gallery/${this.props.media.id}`, {
    context: this,
    state:'gallery',
    // asArray: true
  })
}

  

componentWillUnmount() {
  base.removeBinding(this.statsRef);
  base.removeBinding(this.galleryRef);
}
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

getClicks= () => {
  base.fetch(`gallery`,{
    context: this,
    asArray: true,
    then(data){
      console.log(data);
    }
  })
}
render() {
  return (

      <div className='image-grid' >
        { ( !this.state.gallery.affiliated || this.state.completed ) && (this.state.gallery.url && this.state.gallery.clicks >= '30')
          ? <div>
              <span className="media-title">{this.state.gallery.title}</span>
                  <Imager   
                      data-tip="upgrade to pro for unlimited clicks" 
                      className="mr-3" src={this.props.media.src} 
                      style={{
                          width: 225, 
                          height: 225, 
                          margin: 10, 
                          border: '7px ridge', 
                          padding: 5,  
                          boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', 
                          borderColor: 'pink'}} 
                      />
              <ReactTooltip place="top" type="light" effect="float"/>
          </div> 
      : this.state.gallery.filled || this.state.gallery.clicks < '30'
      
          /**
           * 
           * 
           * linked
           */
      ?   <div>
              <span className="media-title" onClick={this.props.clicksRemaining}>
                  <h5>{this.state.gallery.title}</h5> </span>
                  <a href={this.state.gallery.url} >
                  <Imager  
                      data-tip={this.state.gallery.url} 
                      className="mr-3" src={this.props.media.src} 
                      style={{
                          width: 225, 
                          height: 225,
                          margin: 10, 
                          border: '7px ridge', 
                          padding: 5,  
                          boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', 
                          borderColor: 'gold'}} 
                      />
                  </a>
              <ReactTooltip place="top" type="light" effect="float"/>
          </div>
      :''
              }
        </div>   
      );
    }
  }

 