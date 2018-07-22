
import React, {Component } from 'react'
// import axios from 'axios';
let shortUrl;
// const CLIENT_ID = 'f917135d477d7653ab28557b83c765d769a824c4';
// const CLIENT_SECRET = 'f917135d477d7653ab28557b83c765d769a824c4';
const access_token = 'd00a795d6ce23f36ca494486da00dcabe09e539f';


export default class ShortenLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longUrl:'',
            shortUrl:''
        };
    }
    handleChange(e) {
        // e.preventDefault();
        const target = e.target;
        const value = target.value;
        this.setState({
            longUrl: value
        });
    }
    async shortenLink()  {
        const BITLY_URL =  `https://api-ssl.bitly.com/v3/shorten?access_token=${access_token}&longUrl=${this.state.longUrl}`;
        try {
            let response =  await fetch(BITLY_URL, {method: 'GET', 'content-type': 'UTF-8'});
                if (response.ok) {        
                    let bitly  =   await response.json();
                    shortUrl = bitly.data.map(info => ({
                            url: info.url,
                            hash: info.hash,
                            global_hash: info.global_hash,
                            long_url: info.long_url,
                            new_hash: info.new_hash
                    }));
                    console.log(shortUrl.url)
                        return shortUrl;
                        }; 
                        throw new Error('Request failed!');  
                    } catch  (error) {
                        console.log(error);
                    }
                };

    render() {
        return(
            <div>
                <input type="url" onChange={this.handleChange.bind(this)} className="urlInput"></input><button onClick={this.shortenLink.bind(this)}>Shorten</button>
                {
                    this.state.shortUrl
                    ? <p>url: {this.state.shortUrl}</p>
                    : <p>shortened Url will appear here.</p>
                }
            </div> 

        );
    }
}