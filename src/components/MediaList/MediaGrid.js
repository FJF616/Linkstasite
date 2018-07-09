import React from 'react';
import './MediaList.scss';
import MediaGridComponent from '../Media/MediaGridComponent'
// import Media from '../Media/Media.js'

class MediaGrid extends React.Component {
  // constructor(props) {
  //   super(props);
   
  //   this.onClickDelete = this.onClickDelete.bind(this);
  // }

  // onClickDelete(e) {
  //   const { id } = this.props;
  //   const clickedId = e.target.value;
  //   const newList = this.props.medias.filter(media => media.id !== clickedId);
  //   this.props.onListChange(id, newList);
  // }

    
    
   
  
  

  render () {
    return (
      <div className='list'>
        {
          this.props.gallery.map((media) => {
            return <MediaGridComponent    media={media} key={media.id} />;
          })
        }
      </div>

    );
  }
}

export default MediaGrid;
