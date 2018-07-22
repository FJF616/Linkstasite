
import React, {Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { Delay } from 'react-delay';
// import axios from 'axios';
let shortUrl={};

// const CLIENT_ID = 'f917135d477d7653ab28557b83c765d769a824c4';
// const CLIENT_SECRET = 'f917135d477d7653ab28557b83c765d769a824c4';
const access_token = 'd00a795d6ce23f36ca494486da00dcabe09e539f';

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
            copied: false
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
                    <CopyToClipboard text={this.state.shortUrl}
                        onCopy={() => this.setState({copied: true})}>
                        <button>Copy to clipboard</button>
                    </CopyToClipboard>
                    {this.state.copied 
                        ? <div>
                            <span style={{color: 'red'}}>Copied.<button onClick={this.handleClick.bind(this)}>Enter Another Url</button> </span>
                        </div> 
                        : null
                        }
                  </div>
                : <div>
                    <input type="url" onChange={this.handleChange.bind(this)} className="urlInput"></input><button onClick={this.shortenLink.bind(this)}>Shorten</button>
                  </div>
                }
            </div> 
        );
    }
}