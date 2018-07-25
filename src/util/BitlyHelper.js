
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
                console.log(response);     
                let bitly  =   await response.json();
                let shortUrl = await bitly.data
                // this.setState({ 
                //     shortUrl: shortUrl.url
                // })
                return shortUrl;
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
            'content-type': 'UTF-8'
        });
        if (response.ok) {   
            console.log(response);     
            let bitly  =   await response.json();
            let clicks = await bitly.data;
            // this.setState({ 
            //     clicks: clicks.link_clicks 
            // });
                return clicks;
                } 
                throw new Error('Request failed!');  
            } catch  (error) {
                console.log(error);
                }
            },
                                    
            
};
export default Bitlink;
      