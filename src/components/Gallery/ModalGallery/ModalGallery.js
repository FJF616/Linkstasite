import React from 'react';
import { base } from '../../rebaseConfig/firebase';
import ReactDOM from 'react-dom'
// Component for gallery image
const galleryContainer = document.querySelector('.react-gallery');
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
        <a className='modal-close'  onClick={this.props.onClick}><span className='fa fa-times'></span></a>
    
        <img src={this.props.src} />
       </div>
      </div>
     )
    }
   }
   
   // Component for gallery
 export default  class Gallery extends React.Component{
    constructor(props) {
     super(props);
    
     this.state = {
      showModal: false,
      url: ''
     }
    
     this.openModal = this.openModal.bind(this);
    
     this.closeModal = this.closeModal.bind(this);
    }
    // componentWillMount(){
    //     base.syncState('imageUrls', {
    //         context: this,
    //         state: 'imgUrls',
    //         asArray: true
    //     });
    // }
    render() {
        const  imgUrls  = {...this.props.image};
     return(
      <div refs='gallery-container' className='container-fluid gallery-container'>
      <div className='row'>
       {
        Object.keys(imgUrls).map((url, index) => {

          this.setState({
            url: url.src
          })
         return <div className='col-sm-6 col-md-3 col-xl-2'>
          <div  className='gallery-card'>
           <GalleryImage className='gallery-thumbnail' key={url} src={url.src} alt={'Image number ' + (index + 1)} />
    
           <span className='card-icon-open fa fa-expand' value={url.src} onClick={(e) => this.openModal(url.src, e)}></span>
          </div>
         </div>
        })
       }
      </div>
    
      <GalleryModal onOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url.src} /> 
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
   ReactDOM.render(
    <Gallery  />
  , galleryContainer);