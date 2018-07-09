import React from 'react';
import './MediaList.scss';
import PhotoContainer from '../PhotoContainer/PhotoContainer';
import { base } from '../rebaseConfig/firebase';
// import Media from '../Media/Media.js'
import Graph from '../Graph/Graph';
// class MediaList extends React.Component {
//   componentDidMount() {
//       base.syncState('gallery', {
//       context: this,
//       state: 'gallery',
      
//   });
// }

 const MediaList = ({ gallery }) => {
    return (
      <div className='list'>
        { 
          gallery.map(media => {
            return <PhotoContainer  media={media} key={media.id} />;
          })
        }
      </div>
    );
  }
export default MediaList;
