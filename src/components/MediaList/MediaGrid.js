import React from 'react';
import './MediaList.scss';
import MediaGridComponent from '../Media/MediaGridComponent'
// import Media from '../Media/Media.js'

class MediaGrid extends React.Component {
  


  render () {
    return (
      <div className='list'>
        {
          this.props.medias.map(media => {
            return <MediaGridComponent  handleDelete={this.deleteItem} media={media} key={media.id} />;
          })
        }
      </div>

    );
  }
}

export default MediaGrid;
