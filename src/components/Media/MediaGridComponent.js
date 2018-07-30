import React, { Component } from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
import ReactTooltip from 'react-tooltip';
import ProgressBar from '../Graph/ProgressBar';
// import { withRouter } from 'react-router-dom'
export default class MediaGridComponent extends Component { 
  state = {
    completed: false,
    stats: {
      link: '',
      clicks: 0,
    
    }
  }
//    state = {
//      gallery:[]
//    }
//  componentDidMount() {
//   base.syncState('gallery', {
//     context: this,
//     state: 'gallery'
//   });
// }
// componentWillMount() {
//   this.statsRef = base.syncState('stats', {
//     context: this,
//     state: 'stats',
   
//   })
// }
// componentWillUnmount() {
//   base.removeBinding(this.statsRef);
// }
updateClicks = () => {
  base.update(`affiliates/${this.props.media.key}`, {
    data: { clicks: this.state.stats.clicks},
    then(err) {
      if(!err){
        console.log('success tracking clicks')
      }
    }
  })
}
handleClicks = () => {
//  const  key  = this.props.media.key;
 const clicks  = this.state.stats.clicks;
 let amount = clicks + 25;
 if (amount === 100) {
   this.setState({completed : true})
 } else {
 this.setState({
    stats: { 
      link: this.props.media.affiliateLink, 
      clicks: amount 
    }
 });
}
 this.updateClicks();
}
getClicks= () => {
  base.fetch(`affiliates/${this.props.media.key}`,{
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
        { this.props.media.affiliateLink && !this.state.completed
            ?  <div>
                  <span className="media-title">{this.props.media.title}</span>
                  <a href={this.props.media.affiliateLink} ><Imager  onClick={this.handleClicks} data-tip={this.props.media.affiliateLink} className="mr-3" src={this.props.media.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} /></a>
                  <ProgressBar data={this.state.stats} />
                  <ReactTooltip place="top" type="light" effect="float"/>
                </div>
                : this.state.completed 
                ? <div>
                    <span className="media-title">{this.props.media.title}<p>{this.state.stats.clicks}</p></span>
                    <Imager  onClick={this.handleClicks} data-tip="upgrade to pro for unlimited clicks" className="mr-3" src={this.props.media.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} />
                    <ReactTooltip place="top" type="light" effect="float"/>
                </div>
            : ''
            }
        </div>   
      );
    }
  }

 