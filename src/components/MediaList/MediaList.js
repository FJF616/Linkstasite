import React from 'react';
import './MediaList.scss';
import PhotoContainer from '../PhotoContainer/PhotoContainer';

// import Media from '../Media/Media.js'

class MediaList extends React.Component {
  



  render () {
    return (
      <div className='list'>
      {
        this.props.medias.map(media => {
          return <PhotoContainer media={media} key={media.id} />;
        })
      }
      </div>
    );
  }
}

export default MediaList;
