import React from 'react';
import './MediaList.scss';
import PhotoContainer from '../PhotoContainer/PhotoContainer';
import { base } from '../rebaseConfig/firebase';
// import Media from '../Media/Media.js'
import Graph from '../Graph/Graph';
class MediaList extends React.Component {
  componentDidMount() {
      this.galleryRef = base.syncState('gallery', {
      context: this,
      state: 'gallery',
      
  });
}
  componentWillUnmount() {
    base.removeBinding(this.galleryRef);
  }
  

 render() {
  //  const images = this.galleryRef.context.state.gallery;
   return(
      <div  className='list'>
      
        { 
          this.props.gallery.map(media => {
            return <PhotoContainer  media={media} key={media.id} />;
          })
        }
       
      </div>
    );
  }
}
export default MediaList;
