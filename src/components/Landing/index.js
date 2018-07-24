import InstagramLogin from '../../util/InstagramLogin';
// import { Card, Col, Row, Grid } from 'reactstrap';
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase';
// import Media from '../Media/Media';
import './Landing.scss';
import '../Gallery/ModalGallery/Modal.scss';
// import InstagramProvider from '../Session/InstagramProvider'
// import TitlebarGridList from '../GridList/GridList'
import Header from "../Header/Header";
import SideBar2 from '../SideBar/SideBar2'
// import Gallery from '../Gallery/ModalGallery/ModalGallery'


  export class GalleryImage extends React.Component {
    render() {
     return(
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
     )
    }
   }
   
   // Component for gallery modal
   export class GalleryModal extends React.Component {
    render() {
     if (this.props.isOpen === false) {
      return null;
     }
    
     return(
      <div isOpen={this.props.isOpen} className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
       <div className='modal-body'>
        <a className='modal-close' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
    
        <img src={this.props.src} alt='1'/>
       </div>
      </div>
     )
    }
   }
   
   // Component for gallery
//  export  class Gallery extends React.Component{
//     constructor(props) {
//      super(props);
    
//      this.state = {
//       showModal: false,
//       url: ''
//      }
    
//      this.openModal = this.openModal.bind(this);
    
//      this.closeModal = this.closeModal.bind(this);
//     }
//     // componentWillMount(){
//     //     base.syncState('imageUrls', {
//     //         context: this,
//     //         state: 'imgUrls',
//     //         asArray: true
//     //     });
//     // }
//     render() {
//         const  imgUrls  = {...this.state.image};
//      return(
//       <div refs='gallery-container' className='container-fluid gallery-container'>
//       <div className='row'>
//        {
//         Object.keys(imgUrls).map((key, index) => {
//          return <div className='col-sm-6 col-md-3 col-xl-2'>
//           <div  className='gallery-card'>
//            <GalleryImage className='gallery-thumbnail' key={key} src={key.src} alt={'Image number ' + (index + 1)} />
    
//            <span className='card-icon-open fa fa-expand' value={key.src} onClick={(e) => this.openModal(key.src, e)}></span>
//           </div>
//          </div>
//         })
//        }
//       </div>
    
//       <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} /> 
//      </div>
//      )
//     }
    
//     // Function for opening modal dialog
//     openModal(url, e) {
//      this.setState({
//       showModal: true,
//       url: url
//      })
//     };
   
//     // Function for closing modal dialog
//     closeModal() {
//      this.setState({
//        showModal: false,
//        url: ''
//      })
//     }
//    }
   class LandingPage extends Component {
    constructor() {
      super();
      this.state = {
            gallery: [] ,
            slides: [],   
            userProfile:[],
            image:[] ,
            proGallery:[],
           
              showModal: false,
              url: ''
            // listView:false
        };
        this.openModal = this.openModal.bind(this);
    
     this.closeModal = this.closeModal.bind(this);
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
      
        // renderMediaList = (media) =>
          
        // <Media  gallery={this.galleryRef.context.state.gallery} key={media.id} media={media} />
        render() {
          const  imgUrls  = [...this.state.image];
       return(
         <div className="App" >
       <Header/>
       <SideBar2/>
        <div refs='gallery-container' className='container-fluid gallery-container'>
        <div className='row'>
         {
          Object.keys(imgUrls).map((key, index) => {
           return <div className='col-sm-6 col-md-3 col-xl-2'>
            <div  key={key} className='gallery-card'>
             <GalleryImage className='gallery-thumbnail' key={key}  src={imgUrls[index].src} alt={'Image number ' + (index + 1)} />
      
             <span className='card-icon-open fa fa-expand' value={key.src} onClick={(e) => this.openModal(key.src, e)}></span>
            </div>
           </div>
          })
         }
        </div>
      
        <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} /> 
       </div>
       </div>
       )
      }
      
      // Function for opening modal dialog
      openModal(url, e) {
       this.setState({
        showModal: true,
        url: url
       })
      };
     
      // Function for closing modal dialog
      closeModal() {
       this.setState({
         showModal: false,
         url: ''
       })
      }
  }
export default LandingPage;
