/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * These are the helper methods for fetching a shortened url as well as getting the click stats for the shortened url, 
 * first use shortlink and use the return value for the input value on fetchlink method. these will be used during the 
 * lifecycle methods 
 */
const access_token = process.env.REACT_APP_BITLY_ACCESS_TOKEN;


const Bitlink = {

async shortenLink(longUrl)  {
    const BITLY_URL =  `https://api-ssl.bitly.com/v3/shorten?access_token=${access_token}&longUrl=${longUrl}`;
    try {
        let response =  await fetch(BITLY_URL, {
            method: 'GET', 
            'content-type': 'UTF-8'
            
           });
            if (response.ok) {   
                   
                let bitly  =   await response.json();
                let shortUrl = await bitly.data
               
                return shortUrl;
                } 
                throw new Error('Request failed!');  
            } catch  (error) {
                console.log(error);
                }
            },

async expandLink(shortUrl) {
    const BITLY_URL =  `https://api-ssl.bitly.com/v3/expand?access_token=${access_token}&shortUrl=${shortUrl}`;
    try {
        let response =  await fetch(BITLY_URL, {
            method: 'POST', 
            'content-type': 'UTF-8'
            
           });
            if (response.ok) {   
                // console.log(response);     
                let bitly  =   await response.json();
                let longUrl = await bitly.data
               
                return longUrl;
                } 
                throw new Error('Request failed!');  
            } catch  (error) {
                console.log(error);
                }
            },


async fetchClicks(url)   {
    const BITLY_URL = `https://api-ssl.bitly.com/v3/link/clicks?access_token=${access_token}&link=${url}`;
    try {
        let response =  await fetch(BITLY_URL, {
            method: 'GET', 
            'content-type': 'UTF-8',
        
           
            
        });
        if (response.ok) {   
            // console.log(response);     
            let bitly  =   await response.json();
            let clicks = await bitly.data;
           
                return clicks;
                } 
                throw new Error('Request failed!');  
            } catch  (error) {
                console.log(error);
                }
            },
                                    
            
};
export default Bitlink;
      