import React from 'react';


const Ipify = {
async shortenLink(longUrl)  {
    const IPIFY_URL =  `https://api.ipify.org?format=jsonp`;
    try {
        let response =  await fetch(IPIFY_URL, {
            method: 'GET', 
            'content-type': 'UTF-8'
           });
            if (response.ok) {   
                console.log(response);     
                let ipify  =   await response;
                let ip = await ipify.data
                // this.setState({ 
                //     shortUrl: shortUrl.url
                // })
                return ip;
                } 
                throw new Error('Request failed!');  
            } catch  (error) {
                console.log(error);
                }
            }
        }

        export default Ipify;