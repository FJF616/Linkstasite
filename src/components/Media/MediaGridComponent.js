import React from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
// import { withRouter } from 'react-router-dom'
class MediaGridComponent extends React.Component {
 
//  componentDidMount() {
//   base.syncState('gallery', {
//     context: this,
//     state: 'gallery'
//   });
//  }
 
  
//  deletItem() { 
//    base.remove('gallery', function(err){
//      if(!err){
//        console.log('deleted from gallery.');
//      }
//    });

//  }
  render () {
    return (
        <div className='image-grid' >
          <Imager src={this.props.media.image} style={{width: 210, height: 210, margin: 5, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} alt='1'>
           <div className="trash__container">
            <Icon  onClick={this.deleteItem} className="trash__icon" icon={ICONS.BIN3} color={"white"} size={56} />
          </div>
         </Imager>
        </div>
    );
  }
 
  
}

export default MediaGridComponent;
