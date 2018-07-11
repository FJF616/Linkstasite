import React from 'react';
import './MediaList.scss';
import { base } from '../rebaseConfig/firebase'
import MediaGridComponent from '../Media/MediaGridComponent'
// import Media from '../Media/Media.js'

class MediaGrid extends React.Component {
  // constructor(props) {
  //   super(props);
   state = {
     gallery: []
   }

   componentDidMount() {
     base.fetch('gallery', {
       context: this,
       state: 'gallery'
     })
   }
   
  //   this.onClickDelete = this.onClickDelete.bind(this);
  // }

  // onClickDelete(e) {
  //   const { id } = this.props;
  //   const clickedId = e.target.value;
  //   const newList = this.props.medias.filter(media => media.id !== clickedId);
  //   this.props.onListChange(id, newList);
  // }

    
    
   
  
  

  render () {
    this.state.gallery.map(media => {
      console.log('media', media);
      console.log('media.id', media.id);
      
    })
    return (
      <div className='list'>
        {
          this.state.gallery.map(media => {
            console.log('media', media);
            console.log('media.id', media.id);
            return <MediaGridComponent    media={media} key={media.id} />;
          })
        }
      </div>

    );
  }
}

export default MediaGrid;
