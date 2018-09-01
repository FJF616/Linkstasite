import axios from 'axios';
import { base } from '../components/rebaseConfig/firebase';
// import { keys } from '../../node_modules/mobx';
// const auth = require('../components/rebaseConfig/firebase')
const redirectURI = `http://localhost:3000/`;
const client_id = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;
// const log_out_url = `http://instagram.com/accounts/logout/`;
let accessToken;
const instagramToken = /^(\d+)/gm.test(accessToken);
let jsonResponse;
let instagramUser = {
  user: {
    instagramToken:`${instagramToken}`,
  },
  
  gallery:{},
  slides: {},
  image:{},
  paginationUrl: ''
  
};

let proGallery ={};
class InstagramLogin {
    getAccessToken = () => {
        if (accessToken) {
          return new Promise(resolve => resolve(accessToken));
        }
        const Match = window.location.href.match(/access_token=([^&]*)/);
        if (Match) {
          //set access token to regex match group
          accessToken = Match[1];
          return accessToken;
        } else {
          //use redirect instead of popup window
          
         window.location = auth_url;
        
        }
        
      };
      async getProGallery() {
        // if(!accessToken) {
        //   this.getAccessToken();
        // }
        const accessToken = await this.getAccessToken()
      
       
        const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=20`;
        try {
          let response = await fetch(token_url, {
            method: 'GET'
          });
          if (response.ok) {
            console.log(response);
            jsonResponse = await response.json();
            proGallery = jsonResponse.data.map(info =>  ({
              src: info.images.standard_resolution.url,
              title: info.caption ? info.caption.text : '',
              id: info.id,
              url: '',
              affiliated: false,
              editing: false,
              edited: false,
              filled: false
              
              }));
          
              return proGallery;
    
          }
          throw new Error('Request failed!');
        } catch (error) {
          console.log(error);
        }
      };
  getUserMedia = async (count) => {
    
        
   
   
        
        if(!accessToken) {
            this.getAccessToken();
          }
          
          const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=${count}`;
          try {
            let response = await fetch(token_url, {
              method: 'GET'
            });
            if (response.ok) {
              console.log(response);
              jsonResponse = await response.json();
            //   base.push('instagramUser', {
            //     data: {instagramUser: jsonResponse.data},
            //     then(err) {
            //         if(!err) {
            //             console.log('created initial account')
            //         }
            //     }
            // })
              
           
             //this will be used as the user profile info
              instagramUser.user = jsonResponse.data.map(info => ({
                // id: info.id,
               
                // image: info.images.standard_resolution.url,
                instagramUserID: info.user.id,
                // url: info.link,
                // title: info.caption ? info.caption.text : '',
                profilePic: info.user.profile_picture,
                userName:info.user.full_name,
                favorite: false,
                access_token: `${accessToken}`,
                // likes: info.likes.count,
                // tags: info.tags
              }));
               //this will be used as the main gallery 
                instagramUser.gallery = jsonResponse.data.map(info => ({
                  src: info.images.standard_resolution.url,
                  // title: info.caption ? info.caption.text : '',
                 
                  id: info.id,
                  // url: '',
                  affiliated: false,
                  editing: false,
                  edited: false,
                  filled: false
                }));
                //for testing with firebase
                instagramUser.slides = jsonResponse.data.map(info=> ({
                  src: info.images.standard_resolution.url,
                  id: info.id,
                
                  title: info.caption ? info.caption.text : '',
      
                }));
                //used for the modal gallery
                instagramUser.image = jsonResponse.data.map(info => ({
                  src: info.images.standard_resolution.url,
                 
                  // id: info.id
                }))
                
                return instagramUser;
      
            }
            throw new Error('Request failed!');
          } catch (error) {
            console.log(error);
          }
  };

 login(count) {
    const accessToken = this.getAccessToken();  
    return new Promise((resolve, reject) => {
    axios.get('https://api.instagram.com/v1/users/self/media/recent/', {
      params: {
        access_token: `${accessToken}`,
        count,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch(error => reject(error));
  });
};


  async loadMorePhotos(count)  {
   
        // const accessToken = this.this.getAccessToken();  
        const keys = Object.keys(instagramUser.gallery);
        const max_id = keys[keys.length - 1]
        const paginationUrl = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&count=${count}&max_id=${max_id}`
        let response = await fetch(paginationUrl, {
            method: 'GET'
          });
          if (response.ok) {
            console.log(response);
            jsonResponse = await response.json();
            let newPics = jsonResponse.data
              base.push('instagramUser', {
                data: {instagramImages: newPics},
                then(err) {
                    if(!err) {
                        console.log('created initial account')
                    }
                }
            }) 
            console.log('images added to firebase',)
             return newPics
         }
    };
}
export default new InstagramLogin();