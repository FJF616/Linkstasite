import React from 'react';
import './MediaList.scss';
import PhotoContainer from '../PhotoContainer/PhotoContainer';
import { base } from '../rebaseConfig/firebase';
import Media from '../Media/Media.js'

const MediaList = ({ medias }) => {
//   componentWillMount() {
//       base.syncState('gallery', {
//       context: this,
//       state: 'gallery',
//       asArray: true
//   });
// }


 
    return (
      <div className='list'>
        {
        medias.map(media => {
          return <Media media={media} key={media.id} />
        })
      }
      </div>
    );
  }

export default MediaList;