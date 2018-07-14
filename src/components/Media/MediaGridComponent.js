import React, { Component } from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
import ReactTooltip from 'react-tooltip';

// import { withRouter } from 'react-router-dom'
export default class MediaGridComponent extends Component { 
//    state = {
//      gallery:[]
//    }
//  componentDidMount() {
//   base.syncState('gallery', {
//     context: this,
//     state: 'gallery'
//   });
// }

render() {
  return (
      <div className='image-grid' > 
        { this.props.media.affiliateLink

            ?  <div>
                <a href={this.props.media.affiliateLink} ><Imager  data-tip={`title: ${this.props.media.title}, url: ${this.props.media.affiliateLink}`} className="mr-3" src={this.props.media.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} /></a>
                <ReactTooltip place="top" type="light" effect="float"/>
              </div>

            : null }
         
        </div>   
      );
    }
  }

 