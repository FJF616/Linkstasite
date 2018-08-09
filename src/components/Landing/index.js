
import React, { Component } from "react";
import { base } from '../rebaseConfig/firebase';
import './Landing.scss';
import Header from "../Header/Header";
import SideBar2 from '../SideBar/SideBar2';
import withAuthorization from '../Session/withAuthorization';
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
      <div isOpen={this.props.isOpen} className='modal-overlay' onClick={this.props.onClick} >
       <div className='modal-body'>
        <a className='modal-close' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
        <span className="modal-title">
          <a href={this.props.link}><h1><b>{this.props.title}</b></h1></a>
        </span>
      
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
    }
    componentDidMount() {
      this.baseRef = base.listenTo('gallery', {
        context: this,
        asArray: true,
        then(galleryData) {
          console.log(galleryData)
          this.setState({ image: galleryData })
        }
      })
    }

    componentWillUnmount() {
      base.removeBinding(this.imageRef);
      base.removeBinding(this.baseRef);
    }

  //   getMapKeyValueByIndex = (obj, idx) => {
  //     var key = Object.keys(obj)[idx];
  //     return { key: key, value: obj[key] };
  //  }
  //  getMedia = () => {
  //   const match = this.state.showModal ? this.state.url : '';
  //   const o = {...this.state.image};
  //   let idx;
  //   let prop = Object.keys(o)[idx]
  //   let value = o[prop];
  //   let results =[];
  //   if (this.state.showModal) {
  //     for (idx = 0; idx < o.length; idx++) {
  //         const result = (this.getMapKeyValueByIndex(o, match));
  //         results.push(result);
  //     }
  //     return results;
  //   }
   
  //  }
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
      
                              <span className='card-icon-open fa fa-expand' value={imgUrls[index].src} onClick={(e) => this.openModal(imgUrls[index].src, imgUrls[index].title, imgUrls[index].url, e)}><p>clicks: {imgUrls[index].clicks}</p></span>
                            </div>
                        </div>
                      })
                    }
                </div>
      
              <GalleryModal imgUrls={imgUrls} isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} title={this.state.title} link={this.state.link}/> 
              
            </div>
          </div>
        )
      }
      
      // Function for opening modal dialog
      openModal(url, title, link, e) {
       this.setState({
        showModal: true,
        url: url, 
        title: title,
        link: link,
       })
      };
     
      // Function for closing modal dialog
      closeModal() {
       this.setState({
         showModal: false,
         url: '',
         title: '',
         link: ''
       })
      };
  }
  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(LandingPage);