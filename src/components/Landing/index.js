import InstagramLogin from '../../util/InstagramLogin'
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase'
import Media from '../Media/Media'
import ListView from '../ListView/ListView';
import GridView from '../GridView/GridView';
// import { Gallery } from 'react-grid-gallery';
// import NewHeader from '../Header2/NewHeader'
// import NewPara from '../NewPara/NewPara';
// import { Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import Billing from '../Billing'
import { Carousel }  from "react-responsive-carousel";
import Header from "../Header/Header";

class LandingPage extends Component {
      state = {
            gallery: [] ,
            slides: [],   
            listView:false
      }
      componentDidMount = () => {
        InstagramLogin.fetchUserInfo().then(instagramUser => this.setState ({
          gallery: instagramUser.gallery,
          slides: instagramUser.slides
        }))
        base.syncState('gallery', {
              context: this,
              state: 'gallery'
        });
      }
     changeView(Component) {
       this.state.listView 
       ? <ListView />
       : <GridView />
     }
      render() {
        
            const MediaList = ({ gallery }) => {
                  
                  return (
                    <div className='list'>
                      { 
                        this.state.gallery.map(media => {
                          return <Media  media={media} key={media.id} />;
                        })
                      }
                    </div>
                  );
                }
            
        return(
            <div className="App" style={{display: 'table'}}>
                  <Header/>
                    <MediaList />
                
          
            </div>
    
      )
   }
}
export default LandingPage;
