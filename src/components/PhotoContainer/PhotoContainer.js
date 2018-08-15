import React, { Component } from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import './PhotoContainer.scss';
import Imager from '../Imager/Imager';
import ICONS from '../Icons/constants';
import Icon from '../Icons/Icon';
import MicrolinkCard from 'react-microlink';
import ReactTooltip from 'react-tooltip';
import {  base } from '../rebaseConfig/firebase'
import Bitlink from '../../util/BitlyHelper';
import UrlError from '../ErrorBoundary/UrlError';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ShortenLink from '../../util/Bitly';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
// import MediaGridComponent from '../Media/MediaGridComponent';
// import Bar from '../Graph/Bar'
/**
 * 
 * 
 * main component for editing instagram images.
 */
export default class PhotoContainer extends Component {
constructor(props) {
    super(props);
    this.state = {
        
        linkPreview: false,
    }
    this.checkFilled = this.checkFilled.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePreview=this.handlePreview.bind(this);
    }
    
     getLinkStats = async () => {
        let url =  this.state.mediaData.url;
        // let clicks;
        if (this.state.mediaData.url) {
            await  Bitlink.fetchClicks(`${url}`).then(clicks => 
                this.setState({
                    bitlyDataRef: {
                        clicks: clicks.link_clicks,
                        url: `${url}`
                    },
                    clickData: clicks.link_clicks,
                    mediaData: {
                        clicks: clicks.link_clicks
                    }
                }))
                // const timestamp = Date.now();
                // const dataRef =  base.push(`bitlyData`, {
                //     data: { clicks: `${this.state.mediaData.clicks}`, url:  `${url}`, timestamp: `${timestamp}`},
                //     then(err) {
                //         if(!err) {
                //             console.log('updated bitlyData')
                //         }
                       
                //     }
                   
                // })
                // const bitlyRef =  dataRef.key;
                // this.setState({ 
                //     bitlyRef 
                // })
                
            }
        }

   componentWillMount() {
     this.slidesRef =  base.syncState('slides', {
           context: this,
           state: 'slides'
       })
       this.galleryRef = base.syncState(`gallery/${this.props.id}`, {
           context: this,
           state: 'mediaData'
       })
   
     this.bitlyDataRef = base.syncState(`bitlyData/${this.props.media.id}`, {
         context: this,
         state: 'bitlyDataRef'
     })
    }  
   updateRebase = () => {
    const { url, title, edited, editing, filled } = this.state.mediaData;
    if(this.state.mediaData.url.length) {
        const timestamp = Date.now();
        base.update(`gallery/${this.props.media.id}`, {
            data: {url: url, title: title, affiliated: true, edited: edited, editing:false, filled: true, timestamp:`${timestamp}` },
            then(err) {
                if(!err) {
                    console.log('successfully updated gallery from mediaData')
                }
            }
        })
    }
   }

   handleEdit() {
       if (this.state.mediaData.title ) {
       this.setState({
           mediaData: {
            editing: true,
            filled:false
           } 
       });
     }
   };
   
    checkFilled() {
   if (this.state.mediaData.url ) {
        this.setState({
            mediaData: {
            
                filled: true,
                editing: false,
                edited: true,
               }
        })
       this.updateRebase()
    } else { 
        alert('error updating firebase')
    
   
    } 
}
    updateLink(e) {
        const target = e.target;
        const value =  target.value;
        const name = target.type;
        if (!value) {
            alert("error");
        } else {
            this.setState ({
                mediaData: {
                    [name]: value,
                    filled: true,
                    
                }
            })
        }
        
                

        // e.preventDefault();        
            
        // this.props.media.affiliateLink = this.state.mediaData.url;   
        
     }
    

    handleClear(e) {
        const target = e.target;
        let value = target.value;
        // const name = (target.type === 'url') ? 'url': target.type;
       
        value = null;
        this.setState({
           mediaData: {
               url: value,
               filled: false,
               timestamp: null,
               edited: false,
               clicks: null,
               title: '',
               affiliated: false,
               editing: false,
            }
        });
        
        this.props.media.url = null;
    };

    handleChange(e) {
        const target = e.target;
        let value = target.value;
        const name = (target.type === 'text') ? 'title': target.type ;
       
        this.setState({
            mediaData: {
                [name]: value,
                editing: true,
                
            }
        })
    //     e.preventDefault();
    //   this.props.media.title = this.state.mediaData.title
    }
    handleCopy() {   
        this.setState({
            mediaData:{
                edited: false,
            }
        });
    };
    handlePreview = (event, checked) => {
        this.setState({ linkPreview: checked });
      };
    // notPristine = () => {
    //     this.setState({
    //         mediaData: {
    //         pristine: false
    //         }
    //     })
    // }
    componentDidMount() {
        this.getLinkStats();
    }
    
    componentWillUnmount() {
        base.removeBinding(this.bitlyDataRef);
        base.removeBinding(this.slidesRef);
        base.removeBinding(this.galleryRef);
    }
    
   
    render() {    
      return (  
        <div className="cardContainer">
          <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <div className="card" style={{backgroundColor: 'plum', border: '4px  outset', borderColor: 'pink', height: 405, margin: 25, padding: 10,  width: 700}}>
                <div className="card-header" style={{ marginTop: '5px', color: 'rgb(176,196,215)',  paddingTop: 10}}>
                    <div className="input-group">
                      <div className="input-group-prepend">
                       <span className="input-group-text" style={{backgroundColor: 'turquoise', height: 31, width: 110,   boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}>Affiliate Link</span>
                        <div className="input-group-append" >
                            {/* check if url has been entered. if it has, return associated link with image by making it clickable */}
                               
                                {
                                     !this.state.mediaData.edited  
                                        ? this.state.mediaData.url 
                                         ? <a className="affiliate" style={{backgroundColor: 'turquoise', padding: 10, color: 'blue', width: 335, height: 31, marginBottom: 5,  boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline'}}><h6><b>{this.state.mediaData.url}</b></h6></a>
                                           : <UrlError><ShortenLink onChange={this.notPristine} mediaData={this.state.mediaData} id={this.state.mediaData.id} updateLink={this.updateLink} style={{paddingBottom: '10px'}}/></UrlError>
                                             
                                        : <UrlError><ShortenLink mediaData={this.state.mediaData} id={this.state.mediaData.id} updateLink={this.updateLink} style={{paddingBottom: '10px'}}/></UrlError>
                                }
                               {/* <button className="controls" hint="add affiliate link" onClick={this.handleCopy} type="button" data-tip="Add affiliate Link" disabled={this.state.mediaData.edited || this.state.mediaData.url ? this.state.mediaData.url.length : !this.state.mediaData.url} style={{ color: 'blue', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '10px', }}><Icon  icon={ICONS.LINK} color={"blue"} size={32} /></button>*/}
                                <button onClick={this.handleClear} className="controls" type="button" disabled={ this.state.mediaData.url ? !this.state.mediaData.url.length : !this.state.mediaData.url } data-tip="Remove affiliate Link" style={{color: 'purple', paddingLeft: '5px', padding: '5px', width: '40px', height: '31px', marginBottom: '16px', marginLeft: '1px' }}><Icon className= "icon" icon={ICONS.UNLINK} color={"red"} size={31} style={{marginTop: '5px'}} /></button>
                                {/*<button  className="controls" onClick={this.handleEdit} disabled={ !this.state.mediaData.affiliated } type="button" data-tip="Edit title" style={{color: 'purple', padding: '5px', width: '35px', height: '31px', marginBottom: '16px', marginLeft: '2px' }} hint="edit"><Icon className= "icon" icon={ICONS.PENCILSQUARE} color={"green"} size={31} margin={5} /></button>*/}
                                <button onClick={this.checkFilled} disabled={ (this.state.mediaData.affiliated) || (this.state.pristine || this.state.mediaData.filled ) } className="controls" type="button"  data-tip="Save" style={{color: 'purple', padding: '5px', width: '40px', height: '31px', marginLeft: '2px'}}><i className="fa fa-save"/></button>
                                <ReactTooltip place="top" type="light" effect="float"/>
                                <FormGroup>
                                <FormControlLabel style={{paddingLeft: '1px', marginLeft: '5px', marginRight: '-10px'}}
                                    
                                    control={ 
                                        this.state.clickData < '30' || this.props.stripeData
                                        ? <Switch data-tip="Link Preview"   checked={this.state.linkPreview} onChange={this.handlePreview} aria-label="LinkPreviewSwitch" />
                                        : <Switch disabled={true} />
                                        }
                                        label={this.state.linkPreview ? 'On' : 'Off'}
                                        />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
              <div className="media" >
              { 
                ((this.props.stripeData || this.state.clickData < '30' ) && this.state.mediaData.url )? 
                 <a href={this.state.mediaData.url}><Imager  className="mr-3" src={this.state.mediaData.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 3px 6px 0 hsla(0, 5%, 5%, .75)', borderColor: 'gold'}} /></a>
                 : <Imager  className="mr-3" src={this.state.mediaData.src} style={{width: 225, height: 225, margin: 10, border: '7px ridge', padding: 5,  boxShadow: '0 5px 8px 0 hsla(0, 5%, 5%, .75)', borderColor: 'pink'}} />
                }
                  
                    <div className="media-body"> 
                    
                    { 
                    this.state.mediaData.filled  ? 
                        <div className="title" style={{color: 'Blue', marginTop: 10, marginLeft: 10}}> <h3><b>{this.state.mediaData.title}</b></h3>  
                            </div>
                   
                            : !this.state.mediaData.filled && !this.state.mediaData.edited && this.state.mediaData.editing ?
                            <h5><input style={{width: 395, marginTop: 10, marginLeft: '5px', borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 25}}    value={this.state.mediaData.title} onChange={this.handleChange} placeholder="title" type="title" /></h5>
                            :  this.state.mediaData.affiliated || this.state.mediaData.title
                             ? <div className="title" style={{color: 'Blue', marginTop: 10, marginLeft: 10}}>
                            <h3><b>{this.state.mediaData.title}</b></h3>  
                            </div>
                            : <h5><input style={{width: 395, marginTop: 10, marginLeft: '5px', borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 25}}    onChange={this.handleChange} placeholder="title" type="title" /></h5>
                            }
                            <br/>
                                {/* if a link has been added to the image, generate a link preview */}
                                {
                                    this.state.linkPreview && this.state.mediaData.url?
                                    <ErrorBoundary>
                                    <h5>Link Preview 
                                        <MicrolinkCard url={this.state.mediaData.url} size='medium' contrast='true' target='_blank' prerender="auto" image={['screenshot', 'image', 'video']} style={{ display: 'inline-flex', border: '3px ridge', width: 400, marginTop: 4, marginLeft: 3, height: 133, boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .75)'}}/>
                                    </h5>
                                    </ErrorBoundary>
                                    : (this.state.mediaData.url && this.state.clickData > '0') || (this.state.mediaData.url === this.props.media.url) 
                                ? <div className="stats" style={{ backgroundColor: 'aliceblue', color: 'blue', border: '3px  inset', padding:'5px', margin: '5px', marginTop:'30px'}}><h4><b>{ this.state.mediaData.affiliated && this.state.mediaData.clicks === '0' ? `click stats will appear here` : this.props.stripeData && this.state.clickData ? `Total Clicks: ${this.state.clickData}`  :  this.state.clickData ? `Clicks Remaining: ${'30' - this.state.clickData }`: 'Enter affiliate link to get stats'}</b></h4><p><b>{this.state.mediaData.timestamp? `timestamp: ${this.state.mediaData.timestamp}` : null}</b></p><p><b>id: {this.state.mediaData? this.state.mediaData.id : this.props.id}</b></p></div>
                                :  null
                                    } 
                        </div>
                    </div>
                </div>   
            </div>
           
            
        );
      }
    }
