import React, { Component } from 'react';
import  'bootstrap/dist/css/bootstrap.css';
// import '../ListGridView/font-awesome-4.0.3/css/font-awesome.css'
import './PhotoContainer.scss'
import Imager from '../Imager/Imager'
import {Card, Col, Row } from 'reactstrap'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'

export default class PhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        url: '',
        links:[],
        title: '',
        description:'',
        editing: false,
        edited: false,
        filled: false
    }
    this.checkFilled = this.checkFilled.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange= this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    }


   handleEdit() {
       this.setState({
           editing: !this.state.editing
       })
   }
   
    checkFilled() {
     if(this.state.edited) {
        this.setState({filled: true}) 
        return this.state.filled
     }else {
        return this.state.filled
       
   }

    }
    
   
    
    updateLink(e) {
       
        const target = e.target;
        const value =  target.value;
        const name = target.type;
        if(!value) {
            console.log("error")
        } else {
        this.setState ({
            [name]: value  
        })
     
        this.props.media.affiliatedLink = this.state.url;   
    }
  
}
    handleClear(e) {
        const target = e.target;
        let value = target.value;
        const name = target.type;
        value = null;
       
        this.setState({
            url: value,
            edited: false
        })
        this.props.media.affiliatedLink = '';
    }
    handleChange(e) {
        const target = e.target;
        let value = target.value;
        e.preventDefault();
        this.setState({
            title: value
        })
    }
    handleCopy() {
       
        this.setState({
            edited: true
        })
       
    }
   
   
   
    
    render() {
      return (
        
        <div className="cardContainer">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
          <div className="card" style={{height: 365, margin: 15, padding: 10,  width: 675}}>
          <div className="card-header" style={{backgroundColor: 'rgba(153,153,153,0.03)', color: 'rgb(176,196,215)'}}>
          <div className="input-group">
            <div className="input-group-prepend">
            <span className="input-group-text" style={{backgroundColor: 'turquoise', height: 31, width: 110,   boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}>Affiliate Link</span>
                <div className="input-group-append" >
                {/* check if url has been entered. if it has, return associated link with image by making it clickable */}
                    {
                    !this.state.edited ? 
                        <input style={{padding: 10, width: 335, height: 31, borderRadius: '5%',  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}} type="url" onChange={this.updateLink} /> 
                        : 
                        <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.state.url}</b></h6></a>
                        }
                    <button className="controls" onClick={this.handleCopy} type="button" disabled={this.state.edited || !this.state.url} style={{ color: 'blue', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '10px', alignContent: 'center' }}><Icon icon={ICONS.LINK} color={"blue"} size={32} /></button>
                    <button onClick={this.handleClear} className="controls" type="button" disabled={!this.state.edited} style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }}><Icon className= "icon" icon={ICONS.UNLINK} color={"red"} size={31} style={{marginTop: '5px'}} /></button>
                    <button onClick={this.handleClear} className="controls" onChange={this.handleEdit} disabled={!this.state.editing} type="button" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }} hint="edit"><Icon className= "icon" icon={ICONS.PENCILSQUARE} color={"green"} size={31} margin={5} /></button>
                    <button onClick={this.handleClear} className="controls" type="button" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }}><i className="fa fa-save"/></button></div></div>
                </div>
            </div>
         <div className="media" >
            { 
            this.state.edited ? 
                <a href={this.state.url}><Imager  className="mr-3" src={this.props.media.image} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} /></a>
                :
                <Imager  className="mr-3" src={this.props.media.image} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} />
                }
            <div className="media-body">
         
           <h5><input style={{width: 370, marginTop: 10, borderRadius: '6%', color: 'slateBlue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}} type="text" value={this.props.title} onChange={this.handleChange} placeholder="title" /></h5>
            <h5><textarea maxLength="85" style={{width: 370, marginTop: 12, borderRadius: '6%', color: 'slateBlue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15}} placeholder="description"/></h5>
       
                
         
            </div>
       
          </div>
         </div>
            
        </div>
       
         
             
              
         
            
     
      );
    }
  };