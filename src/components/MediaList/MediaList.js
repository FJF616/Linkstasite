import React from 'react';
import './MediaList.scss';
import PhotoContainer from '../PhotoContainer/PhotoContainer';
import { base } from '../rebaseConfig/firebase';
// import Media from '../Media/Media.js'

class MediaList extends React.Component {
//   componentWillMount() {
//       base.syncState('gallery', {
//       context: this,
//       state: 'gallery',
//       asArray: true
//   });
// }




  render () {
    return (
      <div className='list'>
      {
        this.props.medias.map(media => {
          return <PhotoContainer  media={media} key={media.id} />;
        })
      }
      </div>
    );
  }
}

export default MediaList;
