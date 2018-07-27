import React, { Component } from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import './PhotoContainer.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import MicrolinkCard from 'react-microlink';
import ReactTooltip from 'react-tooltip';
// import {Card, Col, Row } from 'reactstrap';
import { base } from '../rebaseConfig/firebase'
// import ProgressBar from '../Graph/ProgressBar'
import Bitlink from '../../util/BitlyHelper';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
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
        url: '',
        title: '',
        editing: false,
        edited: false,
        filled: false,
        slides:{},
        listView: '',
        revised: false,
      
        generatedKeys:[]
    }
    this.checkFilled = this.checkFilled.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateGallery = this.updateGallery.bind(this);
    this.checkLinked = this.checkLinked.bind(this);
    }
    
   UpdateAffiliateGallery(generatedKey) {
       base.fetch(`affiliates/${generatedKey}`, {
           context: this,
           state: 'generatedKeys'
       })
   }
   componentWillMount() {
    //  this.slidesRef =  base.syncState('slides', {
    //        context: this,
    //        state: 'slides'
    //    })
    base.bindToState('affiliates', {
        context: this,
        state: 'affiliates'
    })
   }



//   fetchUrl() {
//     if(!this.state.generatedKey){
//     // let affiliateLinked;
//     const id = Object.keys(this.state.generatedKeys).filter(key => {
//         if (this.props.media.id === key) {
//           return key;
//         }
   
//         console.log(id)
//         return id;
//     })
// }
// }
  updateGallery() {
      const id = this.props.media.id;
      const {url, title} = this.state;
      base.update(`gallery/${id}`, {
        data: { affiliateLink: url, title: title },
        then(err) {
            if(!err) {
                console.log('successfully updated gallery');
            }
        }
    });
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
        const { url, title } = this.state;
        const  src = this.props.media.src;
        const timestamp = Date.now();
        // const id = this.this.props.media.id;
        const dataRef = base.post(`affiliates/${this.props.media.id}`, {
            data: {affiliateLink: url, title: title, src: src, id: `${this.props.media.id}`, dateLinked: `${timestamp}` },
            then(err){
                if(!err) {  
                    console.log('success adding affiliate link');
                }
            }
     });

     /* unique push key */
    const generatedKey = dataRef.key;
    this.newInfo = base.fetch(`affiliates/${this.props.media.id}`, {
        context: this,
        asArray: true,
        then(data) {
            console.log(data);
            
            this.props.media.affiliateLink = data['0'];
            this.props.media.id = data['1'];
            this.props.media.src = data['2'];
            this.props.media.title = data['3'];
            console.log(this.props.media);
        }
        
    })
    this.props.media.newInfo = {...this.newInfo}
    this.props.media.generatedKey = generatedKey;
    this.setState({ generatedKey: generatedKey });
    this.UpdateAffiliateGallery(`${generatedKey}`)
    
   
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
     this.enterData();
     this.updateGallery();
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
       
        value = null;
        this.setState({
            url: value,
            edited: false
        });
        (this.state.generatedKey !== null)  
        ?  base.remove(`affiliates/${this.state.generatedKey}`).then(() => {
            this.setState({ generatedKey : value, editing: false, edited: false, filled: false, revised: true });
            this.props.media.generatedKey = value;
        }).catch(error => {
            console.log('error', error);
        })
        :
        this.props.media.affiliateLink = value;
        
    };

    handleChange(e) {
        const target = e.target;
        let value = target.value;
        // const name = target.type;
       
        this.setState({
            title: value,
        })
        e.preventDefault();
      this.props.media.title = this.state.title;
    }

    handleCopy() {   
        this.setState({
            edited: true,
        });
    };
    // componentWillUnmount() {
    //     base.removeBinding(this.slidesRef);
    // }
    
   
    render() {    
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
                                ? this.props.media.affiliateLink 
                                       ? <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.props.media.affiliateLink}</b></h6></a>
                                       : <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} /> 
                                    : this.state.edited
                                        ? <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.state.url}</b></h6></a>
                                    : <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} />
                                }
                                     
                            <button className="controls" hint="add affiliate link" onClick={this.handleCopy} type="button" data-tip="Add affiliate Link" disabled={this.state.edited || !this.state.url} style={{ color: 'blue', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '10px', }}><Icon  icon={ICONS.LINK} color={"blue"} size={32} /></button>
                            <button onClick={this.handleClear} className="controls" type="button" disabled={!this.state.edited} data-tip="Remove affiliate Link" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }}><Icon className= "icon" icon={ICONS.UNLINK} color={"red"} size={31} style={{marginTop: '5px'}} /></button>
                            <button  className="controls" onClick={this.handleEdit} disabled={ !this.state.filled} type="button" data-tip="Edit title" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }} hint="edit"><Icon className= "icon" icon={ICONS.PENCILSQUARE} color={"green"} size={31} margin={5} /></button>
                            <button onClick={this.checkFilled} disabled={(this.state.filled && !this.state.revised) || ( !this.state.url || this.props.media.affiliateLink)} className="controls" type="button"  data-tip="Save" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginLeft: '2px' }}><i className="fa fa-save"/></button>
                           
                           
                            </div>
                    </div>
                </div>
            </div>
            <div className="media" >
              { this.state.edited 
                ?  <a href={this.state.url}>
                    <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} 
                        className="mr-3" 
                        src={this.props.media.src} 
                    /></a>
                    : (this.props.media.affiliateLink || this.state.filled)
                    ?  <a href={this.props.media.affiliateLink }>
                    <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} 
                        className="mr-3" 
                        src={this.props.media.src} 
                    /></a>
                    :<Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}}
                        className="mr-3" src={this.props.media.src}  
                    />
                }
                    

                    <div className="media-body"> 
                    <ReactTooltip place="top" type="light" effect="float"/>
                    { this.state.filled 
                    ? <div className="title" style={{color: 'Blue', marginTop: 10, marginLeft: 10}}>
                        <h3><b>{this.state.title}</b></h3>  
                      </div>
                    : !this.state.editing 
                     ? <h5><input 
                            style={{width: 370, marginTop: 10, borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}}    
                            onChange={this.handleChange} 
                            placeholder="title" 
                            type="title" 
                        /></h5>
                    : <h5><input 
                            style={{width: 370, marginTop: 10, borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}}  
                            disabled={this.state.filled} 
                            value={this.state.title} 
                            onChange={this.handleChange} 
                            placeholder="title" 
                            type="title" 
                        /></h5>}
                        <br/>
                        {/* if a link has been added to the image, generate a link preview */}
                        {this.state.edited ?
                            <div>
                           <ErrorBoundary>
                                <MicrolinkCard 
                                    url={this.state.url } 
                                    size='medium' 
                                    contrast='false' 
                                    target='_blank' 
                                    prerender="false" 
                                    image={['screenshot', 'image', 'video']} 
                                    style={{ display: 'inline-flex', border: '3px ridge', width: 370, marginTop: 8, marginLeft: 3, height: 135, boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}
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