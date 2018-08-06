import React from 'react';
import './MediaList.scss';
import Media from '../Media/Media.js'

const MediaList = ({ medias }) => (
      <div className='list'>
        {
        medias.map(media => {
          return <Media media={media} key={media.id} />
        })
      }
      </div>
    );
  
export default MediaList;