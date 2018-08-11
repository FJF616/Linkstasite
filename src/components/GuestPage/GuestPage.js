import React, { Component } from 'react';
import TestFooter from '../TestFooter/TestFooter';
import HeaderNonAuth from '../Header/HeaderNonAuth';
import MicrolinkCard from 'react-microlink';
import AvatarEditor from 'react-avatar-editor';
import {withRouter} from 'react-router-dom';

import { base } from '../rebaseConfig/firebase';

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
          <a href={this.props.link}><h2><b>{this.props.title}</b></h2></a><MicrolinkCard url={this.props.link} size="small" style={{ position: 'relative', marginLeft: 55, width: 325 }}/></span>
          <div><a href="https://www.instagram.com/linkstasite"><AvatarEditor className="avatar__img"
          style={{borderRadius: '70%', boxShadow: '0 5px 10px 0 hsla(0, 8%, 9%, .75)', position: 'absolute', bottom: '0', left: '0', border: '4px outset', marginLeft: 10, marginBottom: 10, borderColor:'skyblue'}}
          image={this.props.userProfile.profilePic}
          width={95}
          height={95}
          border={6}
          color={[185, 253, 255, 0.074]} // RGBA
          scale={1.35}
          rotate={1}
          /></a>
        <img src={this.props.src} alt='1'/>
        </div>
       </div>
      </div>
     )
    }
   }
  
  class GuestPage extends Component {
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
      this.profileRef = base.syncState('userProfile', {
        context: this,
        state: 'userProfile'
      })
    
    }
    componentDidMount() {
      this.galleryRef = base.listenTo('gallery', {
        context: this,
        asArray: true,
        then(galleryData) {
          console.log('successfuly fetched image gallery from firebase')
          this.setState({ image: galleryData })
        }
      })
    }

    componentWillUnmount() {
      base.removeBinding(this.imageRef);
      base.removeBinding(this.galleryRef)
      base.removeBinding(this.profileRef);
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
    // deleteMedia = id => {
    //     this.setState(prevState => {
    //       return { gallery: prevState.gallery.filter(media => media.id !==id) };
    //     });
    //   };
      render() {
         
          const  imgUrls  =  {...this.state.image} ;
          return(
              <div  >
            <div className="App" style={{paddingBottom: 35}} >
              <HeaderNonAuth/>
              
                <div refs='gallery-container' className='container-fluid gallery-container'>
                  <h3 style={{marginLeft: 95}}><b>Add affiliate links to your instagram gallery images!</b></h3>
                  <br/>
                    <div className='row'>
                    {
                      Object.keys(imgUrls).map((url, index) => {
                        return <div className='col-sm-6 col-md-3 col-xl-2'>
                            <div  key={url} className='gallery-card'>
                              <GalleryImage className='gallery-thumbnail' key={url}  src={imgUrls[index].src} alt={'Image number ' + (index + 1)} />
                             
                              <span className='card-icon-open fa fa-expand'  value={imgUrls[index].src} onClick={(e) => this.openModal((imgUrls[index].clicks < '30' ? imgUrls[index].src : alert('There is no affiliate link for this image')), imgUrls[index].title, imgUrls[index].url, e)}></span>
                            </div>
                        </div>
                      })
                    }
                </div>
               
              <GalleryModal userProfile={this.state.userProfile} imgUrls={imgUrls} isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} title={this.state.title} link={this.state.link} /> 
              
            </div>
          </div>
          <TestFooter/>
         
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
export default withRouter(GuestPage);
