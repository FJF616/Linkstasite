
import React, {Component } from 'react';
import Icon from '../components/Icons/Icon';
import ICONS from '../components/Icons/constants'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { base } from '../components/rebaseConfig/firebase';
// import { Delay } from 'react-delay';
// import axios from 'axios';
let shortUrl={};

// const CLIENT_ID = 'f917135d477d7653ab28557b83c765d769a824c4';
// const CLIENT_SECRET = 'f917135d477d7653ab28557b83c765d769a824c4';
const access_token = process.env.REACT_APP_BITLY_ACCESS_TOKEN;

/*******
 * 
 * 
 * This works!
 */
export default class ShortenLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longUrl:'',
            shortUrl:'',
            copied: false,
            edited:'',
            filled:'',
        };
    }
    handleClick() {
        this.setState({
            longUrl: '',
            shortUrl: '',
            copied: false
        })
    }
   
    handleChange(e) {
        // e.preventDefault();
        
        const target = e.target;
        const value = target.value;
        this.setState({
            longUrl: value
        });
    }
   
    /**
     * Use bit.ly api to convert to short url
     * TODO: add endpoint for analytics to gather number of clicks to be used for graphing data.
     */
    async shortenLink()  {
        const BITLY_URL =  `https://api-ssl.bitly.com/v3/shorten?access_token=${access_token}&longUrl=${this.state.longUrl}`;
        try {
            let response =  await fetch(BITLY_URL, {method: 'GET', 'content-type': 'UTF-8'});
                if (response.ok) {   
                    console.log(response);     
                    let bitly  =   await response.json();
                       shortUrl = bitly.data
                       this.setState({ shortUrl: shortUrl.url})
                       const id = this.props.id
                       base.update(`gallery/${id}`, {
                           data: {url: `${shortUrl.url}`
                       },
                       then(err) {
                           if(!err) {
                               console.log('entered bilty link')
                           }
                        }
                    })
                        return shortUrl;
                        } 
                        throw new Error('Request failed!');  
                    } catch  (error) {
                        console.log(error);
                    }
                  
            };

    render() {
        return(
            <div>
             {/* enter longUrl, convert it to short, then copy shortUrl to clipboard, clear local state  to enter another LongUrl*/}
                {this.state.shortUrl 
                ? <div>
                    <label className="affiliate" type="url" style={{width: 335,  verticalAlign: 'middle', borderRadius: '6%', color: 'Blue', paddingLeft: 15, marginBottom: '20px', height: 32, boxShadow: '0 3px 4px 0 hsla(0, 5%, 5%, .55)', textDecoration: 'underline' }} disabled={!this.state.copied} value={this.state.shortUrl} />
                    <CopyToClipboard
                        style={{  borderRadius: '6%',  color: 'blue', paddingLeft: '12px', paddingTop: '5px', marginRight: '5px', height: '31px', }}
                        text={this.state.shortUrl}
                        onCopy={() => this.setState({copied: true, })}
                       >
                       <button className="controls" hint="add affiliate link"  type="button" data-tip="Add affiliate Link"  style={{  borderRadius: '6%',  color: 'blue',  paddingTop: '5px', marginRight: '5px', width: '35px', height: '31px', }}><Icon  style={{marginLeft: '10px'}} icon={ICONS.LINK} color={"blue"} size={30} /></button>
                    </CopyToClipboard>
                    {this.state.copied 
                        ? <div>
                            <span style={{color: 'red'}}>Copied. </span><button onClick={this.handleClick.bind(this)}>Enter Another Url</button>
                          </div> 
                        : null
                      }
                  </div>
                : <div>
                    <input   style={{width: 295,  backgroundColor: 'paleturqoise', verticalAlign: 'middle', borderRadius: '6%', color: 'Blue',  boxShadow: '0 3px 2px 0 hsla(0, 5%, 5%, .75)', paddingLeft: 15, marginBottom: '20px' }} type="url" placeholder="enter a url" onChange={this.handleChange.bind(this)} className="urlInput"></input><button className="controls" hint="add affiliate link" onClick={this.shortenLink.bind(this)} type="button" data-tip="Add affiliate Link"  style={{  borderRadius: '6%',  color: 'blue', paddingLeft: '12px', paddingTop: '5px', marginRight: '5px', width: '45px', height: '31px', }}><Icon  style={{marginLeft: '10px'}} icon={ICONS.BITLINK} color={"blue"} size={35} /></button>
                  </div>
                }
            </div> 
        );
    }
}