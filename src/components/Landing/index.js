import InstagramLogin from '../../util/InstagramLogin'
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase'
import RegularList from '../MediaList/MediaList'
import Media from '../Media/Media'
import ListView from '../ListView/ListView';
import GridView from '../GridView/GridView';
// import { Gallery } from 'react-grid-gallery';

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
      }
      
    }
  
    
    removeImage(key) {
     
      const gallery =  {...this.state.gallery};
      delete gallery[key];
   
      this.setState({ gallery });
    }

    componentWillMount() {
    
      this.galleryRef = base.syncState('gallery', {
        context: this,
        state: 'gallery'
      })
      this.slidesRef = base.syncState('slides', {
        context: this,
        state: 'slides'
      })
      this.userRef = base.syncState('userProfile', {
        context: this,
        state: 'userProfile',
        asArray: true
      })
    }
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
        }))
        
      }
      // removeImage= () => {
      //   const todos = this.state.todos.slice();
      //   const filteredTodos = todos.filter(todo => !todo.completed);
      //   this.setState({ todos: filteredTodos });
      // };
    
      renderMediaList = media =>
     <Media gallery={this.galleryRef.context.state.gallery} key={media.id} media={media} onClick={this.deleteMedia} />
      render() {
        
            // const MediaList = ({image, removeImage }) => {
                  
            //       return (
            //         <div className='list'>
            //           { 
            //             Object.keys(this.state.gallery).map((key) => {
            //               return <Media  onClick={removeImage(key)} key={key.id} index={key.id} media={this.state.gallery[key]}/>;
            //             })
            //           }
            //         </div>
            //       );
            //     }
            
        return(
            <div className="App" style={{display: 'table'}}>
                  <Header/>
                  <ul>
                  {this.state.gallery.map(this.renderMediaList)}
                 </ul>
                
          
            </div>
    
      )
   }
}
export default LandingPage;
