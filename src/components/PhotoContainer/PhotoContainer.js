import React, { Component } from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import './PhotoContainer.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import MicrolinkCard from 'react-microlink';
import ReactTooltip from 'react-tooltip';
// import {Card, Col, Row } from 'reactstrap';
import { db, base } from '../rebaseConfig/firebase'
// import ProgressBar from '../Graph/ProgressBar'
import Bitlink from '../../util/BitlyHelper';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import UrlError from '../ErrorBoundary/UrlError';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
// import Graph from '../Graph/Graph';
/**
 * 
 * 
 * main component for editing instagram images.
 */
export default class PhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // url: '',
        // title: '',
        editing: false,
        edited: false,
        filled: false,
        slides:{},
        listView: '',
        revised: false,
        clearAll: false,
        linkPreview: false
        
    }
    this.checkTitle = this.checkTitle.bind(this)
    this.checkFilled = this.checkFilled.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.update = this.update.bind(this);
    this.checkLinked = this.checkLinked.bind(this);
    // this.checkDb = this.checkDb.bind(this);
    // this.getMediaTitle = this.getMediaTitle.bind(this);
    this.updateState = this.updateState.bind(this);
    }
    fetchMediaId = () => {
        return this.props.id;
    }
    updateState() {
        
        if(this.state.affiliatesData) {
             this.setState({
                url: this.state.affiliatesData.affilateLink,
                title: this.state.affiliatesData.title
            })
        }
           
    }
//    UpdateAffiliateGallery(generatedKey) {
//        base.fetch(`affiliates/${generatedKey}`, {
//            context: this,
//            state: 'generatedKeys'
//        })
//    }
   componentWillMount() {
      
    //  this.slidesRef =  base.syncState('slides', {
    //        context: this,
    //        state: 'slides'
    //    })
    // this.galleryRef = base.syncState('gallery/')
    // base.syncState('affiliates', {
    //     context: this,
    //     state: 'affiliates'
    // })
   }
   clearToggle() {
       this.setState({ clearAll: !this.state.clearAll })
   }
componentDidMount() {
   
   base.listenTo('affiliates', {
       context: this,
       then(affiliatesData) {
           const id = this.props.id;
           affiliatesData = affiliatesData[id]
          
            if(affiliatesData) {
                base.syncState('updatedGallery', {
                    context: this,
                    state: 'affiliatesData'
                })
                this.setState({ 
                    url: affiliatesData.affiliateLink,
                    title: affiliatesData.title,
                    affiliatesData
                  });
              }
            }
        })
        this.updateState();
    }
    


  update() {
      const id = this.props.media.id;
      const {url, title} = this.state;
      base.update(`gallery/${id}`, {
        data: { affiliateLink: url, title: title },
        then(err) {
            if(!err) {
               
                console.log('successfully updated gallery');
            }
        }
        
    })
    // this.setState({title: this.props.media.title})
    // this.props.media.title = this.state.title
  }

//    fetchUrl() {
  
//     let affiliateLinked;
//     affiliateLinked = Object.keys(this.state.generatedKeys).filter(data => {
//       if(data === this.props.media.key){
//         return  this.state.generatedKeys[data].this.state.generatedKey.affliateLink
//       }
//       console.log(affiliateLinked)
//       return affiliateLinked;
//     })
//         this.setState({
//             affiliateLinked: affiliateLinked,
//         })
    
    
//     this.props.media.affiliateLinked = this.state.affiliateLinked;
   
//   }

    /*create a gallery in firebase and create a unique key */
    enterData (){
        const { url } = this.state;
        const  src = this.props.media.src;
        const timestamp = Date.now();
        // const id = this.this.props.media.id;
        const dataRef = base.post(`affiliates/${this.props.media.id}`, {
            data: {affiliateLink: url, title: `${this.state.title}`, src: src, id: `${this.props.media.id}`, dateLinked: `${timestamp}` },
            then(err){
                if(!err) {  
                    console.log('success adding affiliate link');
                }
            }
     });

     /* unique push key */
    const generatedKey = dataRef.key;
    this.setState({generatedKey})
    // this.newInfo = base.fetch(`affiliates/${this.props.media.id}`, {
    //     context: this,
    //     asArray: true,
    //     then(data) {
    //         console.log(data.title);
            
    //         this.props.media.affiliateLink = data['0'];
    //         this.props.media.timestamp = data['1'];
    //         this.props.media.id = data['2'];
    //         this.props.media.src = data['3'];
    //         this.props.media.title = data['4']
    //         console.log(this.props.media);
    //     }
        
    // })
    // // this.props.media.newInfo = {...this.newInfo}
    // this.props.media.generatedKey = generatedKey;
    // this.setState({ generatedKey: generatedKey });
    // this.UpdateAffiliateGallery(`${generatedKey}`)
    
   
}
   
   checkLinked() {
      
         if (!this.state.affiliateLinked  && this.state.affiliates.length > -1) {
        const {media} = this.props;
        const {affiliates} = this.state;
        const key = media.id
        const affiliateLinked = affiliates[key].affiliateLink
        this.setState({ affiliateLinked });
    } else {
        console.log('there are no affiliatelinks to re-link to')
    }
}
   handleEdit() {
       if (this.state.filled) {
       this.setState({
           editing: !this.state.editing,
           filled: !this.state.filled,
           revised: !this.state.revised
       });
     }
   };
   
    
   checkFilled() {
     if (this.state.edited && this.state.title ) {
        this.setState({
            filled: true,
            editing: false,
            revised: false,
        });
     }
    
     this.updateState();
      this.enterData();
   }; 

    updateLink(e) {
        const target = e.target;
        const value =  target.value;
        const name = target.type;
       
        if (!value) {
            console.log("error");
        } else {
            this.setState ({
                [name]: value  
            })  
            // base.push('affilates', {
            //     data: {affiliatedLink: value}
            // }).then(() => {
            //     console.log('updated affiliate Link');
            // }).catch(err => {
            //     if(err) { return console.log('error!', err) }
            // });
        }
        // e.preventDefault();          
        // this.props.media.affiliateLink = this.state.url
       
    } 

    handleClear(e) {
        
        const target = e.target;
        let value = target.value;
        // const name = target.type;
       if(this.state.affiliatesData) {
        this.setState({
            affiliatesData: ''
        })
        this.props.media.affiliateLink = ''
       }
        value = '';
        this.setState({
            url: value,
            title: value,
            edited: false,
            // [name]: value
        });
        base.syncState(`affiliates/${this.props.media.id}`, {
            context: this,
            state: 'affiliatesData'
        })
        //  base.update(`affiliates/${this.props.media.id}`, {
        //      data: { affiliateLink: value },
        //      then(err) {
        //          console.log('affiliates gallery does not exist!');
        //          if(!err) {
                    
        //             console.log('updated affiliates gallery');
        //          }
        //      }
           
        // });
        this.setState({ url :'', editing: false, edited: false, filled: false, revised: true });

    }

    handleChange(e) {
        const target = e.target;
        let value = target.value;
        // const name = target.type;
       
        this.setState({
            title: value,
        })
        e.preventDefault();
      this.props.media.title = this.state.title;
      this.setState({ affiliatesData: { title: this.state.title }})
    }

    checkTitle() {
    
          return (this.state.title !== null && this.state.url);
    //   } else {
    //   if (this.state.affiliatesData.title) {
    //     this.setState({ title: this.state.affiliatesData.title });
    //     return this.state.title;
    //   } else {
    //       if (this.props.title !== null) {
    //         this.setState({ title: this.props.title });
    //         return this.state.title;
    //     };           
    // };
    }
    handlePreview = (event, checked) => {
        this.setState({ linkPreview: checked });
      };

  
    handleCopy() {   
        this.setState({
            edited: true,
        });
    };
    // componentWillUnmount() {
    //     base.removeBinding(this.slidesRef);
    // }
    
//    checkDb () {
//     let title;  //every user must have an email
//     db().ref(`affiliates/${this.props.media.id}/title`).once("value", snapshot => {
//         if (snapshot.exists()){
//             console.log("fount title!");
//             title = snapshot.val();
//         }
//         return title;
//     });
//     this.props.media.title = title;
//    }
// getMediaTitle() {
//     const { id, title } = this.props;
    
//     const newTitle = this.state.affiliates.filter(key => {
//         key = affiliates[key];
//         if (id === key.id) {
//             return key.id.title;
//         }
//     });
//     console.log(newTitle)
//     return newTitle;
// }
    render() {    
   
    //    this.getMediaTitle();
      return (   
        
        <div className="cardContainer">
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <div className="card" style={{backgroundColor: 'plum', border: '4px  outset', borderColor: 'pink', height: 365, margin: 25, padding: 10,  width: 675}}>
                <div className="card-header" style={{ color: 'rgb(176,196,215)'}}>
                    <div className="input-group">
                      <div className="input-group-prepend">
                       <span className="input-group-text" style={{backgroundColor: 'turquoise', height: 31, width: 110,   boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}>Affiliate Link</span>
                        <div className="input-group-append" >
                            {/* check if url has been entered. if it has, return associated link with image by making it clickable */}
                            {   
                                !this.state.edited 
                                    ? this.props.media.affiliateLink || this.state.revised && this.state.url
                                       ? <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.props.media.affiliateLink}</b></h6></a>
                                       : <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} /> 
                                    : this.state.url
                                        ? <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.state.url}</b></h6></a>
                                        // : <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} />
                                        : <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} />
                                }
                                     
                            <button className="controls" data-tip="add affiliate link" onClick={this.handleCopy} type="button" data-tip="Add affiliate Link" disabled={this.state.edited || !this.state.url || this.props.media.affiliateLink} style={{ color: 'blue', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '10px', }}><Icon  icon={ICONS.LINK} color={"blue"} size={32} /></button>
                           
                            
                            <button onClick={this.checkFilled} disabled={(this.state.filled && !this.state.revised) ||  ( !this.state.edited && !this.state.editing && !this.state.revised)} className="controls" type="button"  data-tip="Save" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginLeft: '2px' }}><i className="fa fa-save"/></button>
                           
                            <button className="controls" data-tip="clear all" onClick={this.handleClear} style={{ backgroundColor: 'transparent', boxSizing: 'borderBox',  padding: '6px', width: '32px', height: '32px', }}><Icon className= "icon" icon={ICONS.REFRESH} color={"turquoise"} size={45} style={{marginTop: '5px'}} /></button>
                          
                           
                            </div>
                    </div>
                </div>
            </div>
            <div className="media" >
              { this.state.edited || (!this.state.edited && this.state.url)
                ?  <a href={this.state.url}>
                    <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} 
                        className="mr-3" 
                        src={this.props.media.src} 
                    /></a>
                    : (this.props.media.affiliateLink && this.state.revised || this.state.filled && this.state.url)
                    ?  <a href={this.props.media.affiliateLink }>
                    <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} 
                        className="mr-3" 
                        src={this.props.media.src} 
                    /></a>
                    : (this.state.filled)
                    ? <a href={this.state.url}>
                    <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} 
                        className="mr-3" 
                        src={this.props.media.src} 
                    /></a>
                    : <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}}
                        className="mr-3" src={this.props.media.src}  
                    />
                }
                    

                    <div className="media-body"> 
                    <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch data-tip="Link Preview" style={{marginLeft: '10px', position: 'right'}} checked={this.state.linkPreview} onChange={this.handlePreview} aria-label="LinkPreviewSwitch" />
                      }
                       label={this.state.linkPreview ? 'On' : 'Off'}
                    />
                  </FormGroup>
                    <ReactTooltip place="top" type="light" effect="float"/>
                    { ((!this.state.filled && !this.state.edited) && this.checkTitle)
                    ? <div className="title" style={{color: 'Blue', marginTop: 2, marginLeft: 10}}>
                        <h4><b>{this.state.title}</b></h4>  
                      </div>
                    : !this.state.editing 
                     ? <h5><input 
                            
                            style={{width: 370, marginTop: 2, borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}}    
                            onChange={this.handleChange} 
                            placeholder="title" 
                            type="title" 
                        /></h5>
                    : !this.state.edited && !this.state.filled 
                    ?  <div className="title" style={{color: 'Blue', marginTop: 2, marginLeft: 10}}>
                        <h4><b>{ this.props.media.title}</b></h4>  
                       </div>
                    
                    : this.state.affiliatesData.title && !this.state.editing
                    
                    ?  <div className="title" style={{color: 'Blue', marginTop: 2, marginLeft: 10}}>
                        <h4><b>{this.state.affliliatesData.title}</b></h4>  
                      </div>
                    : this.state.title && this.state.url 
                      ? <div className="title" style={{color: 'Blue', marginTop: 2, marginLeft: 10}}>
                            <h4><b>{this.state.affliliatesData.title}</b></h4>  
                        </div>
                    
                    : <h5><input 
                            style={{width: 370, marginTop: 2, borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}}  
                            disabled={this.state.filled} 
                            value={this.state.title} 
                            onChange={this.handleChange} 
                            placeholder="title" 
                            type="title" 
                        /></h5>}
                        <br/>
                        {/* if a link has been added to the image, generate a link preview */}
                        {this.state.linkPreview || this.state.edited  ?
                            <div>
                           <ErrorBoundary>
                                <MicrolinkCard 
                                    url={ this.state.url } 
                                    size='medium' 
                                    contrast='false' 
                                    target='_blank' 
                                    prerender="false" 
                                    image={['screenshot', 'image', 'video']} 
                                    style={{ display: 'inline-flex', border: '3px ridge', paddingBottom: '10px', width: 370, marginTop: 3, marginLeft: 3, height: 120, boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}
                                    />
                                    </ErrorBoundary>
                                    </div>
                            : null} 
                        </div>
                    </div>
                </div>
              
            </div>        
        );
      }
    }