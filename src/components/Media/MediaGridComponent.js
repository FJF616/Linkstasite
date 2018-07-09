import React, { Component } from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
// import { withRouter } from 'react-router-dom'
const MediaGridComponent = ({ media }) => { 
 
//  componentDidMount() {
//   base.syncState('gallery', {
//     context: this,
//     state: 'gallery'
//   });
// }

  return (
      <div className='image-grid' >
        <Imager src={media.image} style={{width: 210, height: 210, margin: 5, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} alt='1'>
          <div  className="trash__container">
          <Icon  className="trash__icon" icon={ICONS.BIN3} color={"white"} size={56} />
        </div>
        </Imager>
      </div>   
      );
    }
 
export default MediaGridComponent;
 