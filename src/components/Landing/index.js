// import InstagramLogin from '../../util/InstagramLogin';
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
/**
 * 
 * 
 * https://blog.alexdevero.com/learn-react-practice-create-gallery/
*/

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
      <div isOpen={this.props.isOpen} className='modal-overlay' onClick={this.props.onClick} name={this.props.title}>
       <div className='modal-body'>
        <a className='modal-close' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
        
        <img src={this.props.src} alt='1'/>
       </div>
      </div>
     )
    }
   }
  
   class LandingPage extends Component {
    constructor() {
      super();
      this.state = {
          
            image:[] ,
            showModal: false,
            url: ''
            // listView:false
        };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      }
    
      
     
  
      componentWillMount() {
      
      this.imageRef = base.syncState('imageUrls', {
        context: this,
        state: 'image'
      })
    //    base.listenTo('updatedGallery', {
    //     context: this,
    //     then(updatedGalleryData) {
    //      let newData = Object.values(updatedGalleryData);
    //      this.setState({
    //         newData
    //     })
    //      console.log(newData)
        
    //      return newData  
    //   }
     
    // })
   
  }

      deleteMedia = id => {
        this.setState(prevState => {
          return { gallery: prevState.gallery.filter(media => media.id !==id) };
        });
      };
      render() {
          const  imgUrls  =  {...this.state.image} ;
       return(
         <div className="App" >
       <Header/>
       <SideBar2/>
        <div refs='gallery-container' className='container-fluid gallery-container'>
        <h3>Your Instagram Gallery</h3>
        <br/>
        <div className='row'>
         {
          Object.keys(imgUrls).map((url, index) => {
           return <div className='col-sm-6 col-md-3 col-xl-2'>
            <div  key={url} className='gallery-card'>
             <GalleryImage className='gallery-thumbnail' key={url}  src={imgUrls[index].src} alt={'Image number ' + (index + 1)} />
      
             <span className='card-icon-open fa fa-expand' value={imgUrls[index].src} onClick={(e) => this.openModal(imgUrls[index].src, e)}></span>
            </div>
           </div>
          })
         }
        </div>
      
        <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} title={this.state.title}/> 
       </div>
       </div>
       )
      }
      
      // Function for opening modal dialog
      openModal(url, e) {
       this.setState({
        showModal: true,
        url: url,
       
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
