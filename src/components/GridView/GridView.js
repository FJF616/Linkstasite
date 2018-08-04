import React, { Component } from 'react';
import '../App/App.css';
import withAuthentication from '../Session/withAuthentication';
// import Navigation from '../Navigation';
// import MediaGrid from '../MediaList/MediaGrid';
// import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar2';
// import withAuthentication from '../Session/withAuthentication'
// import Media from '../Media/Media'
import MediaGridComponent from '../Media/MediaGridComponent'
// import MediaGridCompnpm startonent from '../Media/MediaGridComponent';
import { base } from '../rebaseConfig/firebase'
import Header from '../Header/Header';
class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      // userProfile: [],
   
    };
    // this.onListChange = this.onListChange.bind(this);
    // this.deleteMedia = this.deleteMedia.bind(this); 
  }


    // onListChange (id, updatedList) {
    //   const { gallery } = this.state;
      
    //   this.setState({
    //     gallery: Object.keys(gallery).map(medias => {
    //       if (medias.id !== id) return medias;
          
    //       return {
    //         ...medias,
    //         gallery: updatedList
    //       };
    //     })
    //   });
    // }

     // removeFromGallery(media) {
    //   const gallery = {...this.state.gallery};
    //   delete gallery[media];
    //   this.setState({ gallery });
    // }
    
    // removeImage(id) {
    //   const { newState } = this.state;
    //   const index = newState.gallery.findIndex(media => media.id === id);
      
    //   if (index === -1) return;
    //   newState.gallery.splice(index, 1);
  
    //   this.setState({ gallery: newState });
    // }
   

    //  renderMediaList = media =>
    //  <MediaGrid key={media.id} media={media} onClick={this.deleteMedia} />
    componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery',
        // asArray: true
        
    });
   
  }

  deleteMedia = id => {
    id = this.state.gallery[id]
    this.setState(prevState => {
      return { gallery: prevState.gallery.filter(media => media.id !==id) };
    });
  };

  MediaLists = ({ gallery, deleteMedia })  => {
    gallery = {...this.galleryRef.context.state.gallery};
    return (
      <div key={gallery.id} className='list'>
        { 
        Object.keys(gallery).map((media) => {
            return <MediaGridComponent
                      // updateGallery={this.removeGallery} 
                      refresh={this.deleteMedia}
                      media={gallery[media]} 
                      key={gallery[media].id} 
                      id={gallery[media].id} 
                      title={gallery[media].title}
                      gallery={this.galleryRef}
                     />;
                  })
               }
          </div>
        );
    }

    componentWillUnMount() {
      base.removeBinding(this.galleryRef);
    }
   
  render() {
   
    return (
      <div className="App"> 
      <Header />
       <SideBar2/>
       {this.MediaLists(this.state.gallery)}
      </div>
    );
  }
  

}
export default withAuthentication(GridView);
