import InstagramLogin from '../../util/InstagramLogin';
import { Card, Col, Row, Grid } from 'reactstrap';
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase';
import Media from '../Media/Media';
import './Landing.scss';
import InstagramProvider from '../Session/InstagramProvider'
import TitlebarGridList from '../GridList/GridList'
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
    
      renderMediaList = (media) =>
        
      <Media  gallery={this.galleryRef.context.state.gallery} key={media.id} media={media} />
      render() { 
        return(
        
            <div className="App" style={{display: 'inlineBlock'}}>
           
                <Header/>
                <SideBar2/>
                <p><h1>Your Instagram Gallery</h1></p> 
                  <div className="landing" >
                 
                    
                    <ul >
                    {this.state.gallery.map(this.renderMediaList)}
                  </ul>
                
                  </div>   
            </div>
          
      );
   };
}
export default LandingPage;
