import InstagramLogin from '../../util/InstagramLogin';
import { Card, Col, Row, Grid } from 'reactstrap';
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase';
import Media from '../Media/Media';
import './Landing.scss';
import Header from "../Header/Header";
import SideBar2 from '../SideBar/SideBar2'
class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
          gallery: [] ,
          slides: [],   
          userProfile:[],
          image:[] ,
          proGallery:[]
          // listView:false
      };
      
    }
  
    
   

    componentWillMount() {
      this.proGalleryRef = base.syncState('linkstasite', {
        context: this,
        state: 'proGallery'
      });
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
   
    this.imageRef = base.syncState('imageUrls', {
      context: this,
      state: 'image'
    })
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
      base.removeBinding(this.proGalleryRef)
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
      
      <Card> <Media  gallery={this.galleryRef.context.state.gallery} key={media.id} media={media}/></Card>
      render() { 
        return(
            <div className="App" style={{display: 'flex'}}>
                <Header/>
                <SideBar2/>
               
                  <div className="landing">
                  <p><h1>Your Instagram Gallery</h1></p> 
                    
                    <ul>
                    {this.state.gallery.map(this.renderMediaList)}
                  </ul>
                
                  </div>   
            </div>
      );
   };
}
export default LandingPage;
