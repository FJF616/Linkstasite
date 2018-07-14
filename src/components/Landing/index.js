import InstagramLogin from '../../util/InstagramLogin';
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase';
import Media from '../Media/Media';
import './Landing.scss';
import Header from "../Header/Header";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
          gallery: [] ,
          slides: [],   
          userProfile:[],
          image:[] 
          // listView:false
      };
      
    }
  
    
   

    componentWillMount() {
    
      this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery'
      });
      this.slidesRef = base.syncState('slides', {
        context: this,
        state: 'slides'
      });
      this.userRef = base.syncState('userProfile', {
        context: this,
        state: 'userProfile',
        asArray: true
      });
    };
    deleteMedia = id => {
      this.setState(prevState => {
        return { gallery: prevState.gallery.filter(media => media.id !==id) };
      });
    };

    
    componentWillUnmount() {
      base.removeBinding(this.galleryRef);
      base.removeBinding(this.slidesRef);
      base.removeBinding(this.userRef);
    }
    

      componentDidMount = () => {
        InstagramLogin.fetchUserInfo().then(instagramUser => this.setState ({
          gallery: instagramUser.gallery,
          slides: instagramUser.slides,
          userProfile: instagramUser.user['0'],
          instagramUserID: instagramUser.user.instagramUserID,
          image: instagramUser.image
        }));
      }
    
      renderMediaList = media =>
     <Media gallery={this.galleryRef.context.state.gallery} key={media.id} media={media}  />
      render() { 
        return(
            <div className="App" style={{display: 'table'}}>
                <Header/>
                  <div className="landing">
                    <h1>Your Instagram Gallery</h1>
                  </div>     
                    <ul>
                    {this.state.gallery.map(this.renderMediaList)}
                  </ul>
            </div>
      );
   };
}
export default LandingPage;
