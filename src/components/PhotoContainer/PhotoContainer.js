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
        generatedKey:''
    }
    this.checkFilled = this.checkFilled.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    }
    
   
//    componentWillMount() {
//      this.slidesRef =  base.syncState('slides', {
//            context: this,
//            state: 'slides'
//        })
//    }
    enterData (){
        const { url, title } = this.state;
        const  src = this.props.media.src;
        const timestamp = Date.now();
        // const id = this.this.props.media.id;
        const dataRef = base.push('affiliates', {
            data: {affiliateLink: url, title: title, src: src, id: `${timestamp}` },
            then(err){
                if(!err) {
                    console.log('success');
                }
            }
     });
    const generatedKey = dataRef.key;
    this.props.media.generatedKey = generatedKey;
    this.setState({ generatedKey: generatedKey });
}

   handleEdit() {
       if (this.state.filled) {
       this.setState({
           editing: !this.state.editing,
           filled: !this.state.filled
       });
     }
   };
   
    checkFilled() {
     if (this.state.edited && this.state.title) {
        this.setState({
            filled: true,
            editing: false
        });
     }
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
            //     data: {affiliatedLink: value, src: src, title: title}
            // }).then(() => {
            //     console.log('updated affiliate Link');
            // }).catch(err => {
            //     if(err) { return console.log('error!', err) }
            // });
        }
        e.preventDefault();          
        this.props.media.affiliateLink = this.state.url;   
    } 

    handleClear(e) {
        const target = e.target;
        let value = target.value;
        const name = target.type;
       
        value = null;
        this.setState({
            url: value,
            edited: false
        });
        this.media.affiliateLink = null;
        this.setState({ generatedKey : null });
    };

    handleChange(e) {
        const target = e.target;
        let value = target.value;
        const name = target.type;
       
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
                            {!this.state.edited || this.state.ListView
                                    ? <input data-tip="Please enter a valid url" style={{padding: 10, color: 'blue', width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} /> 
                                    : <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.state.url}</b></h6></a>
                                    }
                            <button className="controls" hint="add affiliate link" onClick={this.handleCopy} type="button" data-tip="Add affiliate Link" disabled={this.state.edited || !this.state.url} style={{ color: 'blue', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '10px', }}><Icon  icon={ICONS.LINK} color={"blue"} size={32} /></button>
                            <button onClick={this.handleClear} className="controls" type="button" disabled={!this.state.edited} data-tip="Remove affiliate Link" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }}><Icon className= "icon" icon={ICONS.UNLINK} color={"red"} size={31} style={{marginTop: '5px'}} /></button>
                            <button  className="controls" onClick={this.handleEdit} disabled={ !this.state.filled} type="button" data-tip="Edit title" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }} hint="edit"><Icon className= "icon" icon={ICONS.PENCILSQUARE} color={"green"} size={31} margin={5} /></button>
                            <button onClick={this.checkFilled} disabled={this.state.filled} className="controls" type="button"  data-tip="Save" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginLeft: '2px' }}><i className="fa fa-save"/></button>
                            <ReactTooltip place="top" type="light" effect="float"/>
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
                    : <Imager 
                        style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}}
                        className="mr-3" src={this.props.media.src}  
                    />}
                    <div className="media-body"> 
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
                        {this.state.edited 
                            ? <h4>Link Preview 
                                <MicrolinkCard 
                                    url={this.state.url} 
                                    size='small' 
                                    contrast='true' 
                                    target='_blank' 
                                    prerender="auto" 
                                    image={['screenshot', 'image', 'video']} 
                                    style={{ display: 'inline-flex', border: '3px ridge', width: 370, marginTop: 10, marginLeft: 3, height: 95, boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}/>
                              </h4>
                            :  ''} 
                        </div>
                    </div>
                </div>
            </div>        
        );
      }
    }