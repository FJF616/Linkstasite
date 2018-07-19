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
    stats: {
      link: '',
      clicks: 0
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

handleClicks = () => {
  
 const { clicks } = this.state.stats
 const amount = clicks + 1;
 this.setState({
    stats: { link: this.props.media.affiliateLink, clicks: amount }
 });
 base.update('stats', {
   data: {link: this.state.stats.link, clicks: this.state.stats.clicks},
   then(err) {
     if(!err){
       console.log('success tracking clicks')
     }
   }
 })
}
render() {
  return (
      <div className='image-grid' > 
        { this.props.media.affiliateLink

            ?  <div >
                <a href={this.props.media.affiliateLink} ><Imager  onClick={this.handleClicks} data-tip={`title: ${this.props.media.title}, url: ${this.props.media.affiliateLink}`} className="mr-3" src={this.props.media.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} /></a>
                
                <ReactTooltip place="top" type="light" effect="float"/>
               
              </div>

            : null }
         
        </div>   
      );
    }
  }

 