import React from 'react';
import './Media.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import { base } from '../rebaseConfig/firebase';
// import { withRouter } from 'react-router-dom'
class MediaGridComponent extends React.Component {
  componentWillMount() {
    base.syncState('medias', {
       context: this,
       state: 'medias',
       if (error) {
           console.log('error')
       }
   });
}
  render () {
    return (
        <div className='image-grid' >
          <Imager src={this.props.media.image} style={{width: 215, height: 215, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} alt='1'>
           <div className="trash__container">
            <Icon  className="trash__icon" icon={ICONS.BIN3} color={"white"} size={56} />
          </div>
         </Imager>
        </div>
    );
  }
 
  
}

export default MediaGridComponent;
