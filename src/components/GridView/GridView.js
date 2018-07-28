import React, { Component } from 'react';
import '../App/App.css';
import withAuthentication from '../Session/withAuthentication';
// import Navigation from '../Navigation';
// import MediaGrid from '../MediaList/MediaGrid';
// import InstagramLogin from '../../util/InstagramLogin';
import SideBar2 from '../SideBar/SideBar2';
// import withAuthentication from '../Session/withAuthentication'
// import Media from '../Media/Media'
import MediaGrid from '../MediaList/MediaGrid'
// import MediaGridCompnpm startonent from '../Media/MediaGridComponent';
import { base } from '../rebaseConfig/firebase'
import Header from '../Header/Header';
class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      userProfile: [],
      accountName:'loading' 
    };
    // this.onListChange = this.onListChange.bind(this);
  }


  // componentDidMount() {
  //   InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
  //         gallery: instagramUser.gallery,
  //         userProfile: instagramUser.user['0'],
  //         accountName: instagramUser.user['0'].userName,
          
  //       })).catch(error => {
  //         if (error) {
  //           console.log("error fetching instagramUser")
  //         }
  //       })
  //     }
  //     });
  //   }
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
    componentWillMount() {
    this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery',
        // asArray: true
        
    });
  }
  


    componentWillUnMount() {
      base.removeBinding(this.galleryRef);
    }
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
    deleteMedia = id => {
      this.setState(prevState => {
        return { gallery: prevState.gallery.filter(media => media.id !==id) };
      });
    };

    //  renderMediaList = media =>
    //  <MediaGrid key={media.id} media={media} onClick={this.deleteMedia} />
  render() {
    // const MediaGrid = ({ gallery, removeImage}) => {
    //   return (
    //     <div className='list'>
    //     {
    //       this.state.gallery.map(media => {
    //         return <MediaGridComponent   media={media} key={media.id} />;
    //       })
    //     }
    //   </div>
    //   );
    // }
  
    // console.log(this.state.userProfile)
    // // console.log(this.galleryRef.context.state.gallery)
    // const galleryFeed = this.galleryRef.context.state.gallery
    // // const linkstaFeed =  this.linkstaFeedRef.context.state.gallery
    // console.log(galleryFeed)
    return (
      <div className="App"> 
      <Header />
       <SideBar2/>
       <MediaGrid  />
      </div>
    );
  }
  

}
export default withAuthentication(GridView);
