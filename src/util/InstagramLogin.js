import axios from 'axios';
import { base } from '../components/rebaseConfig/firebase';

const redirectURI = `http://localhost:3000/`;
const client_id = "0d744e65869b4acc8dde4d6e3c6a58e2";
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;
const log_out_url = `http://instagram.com/accounts/logout/`;
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
  paginationUrl:''
  
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
        const accessToken = await this.getAccessToken();
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
                paginationUrl: info.pagination,
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
                  paginationUrl: info.pagination,
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
                  paginationUrl: info.pagination
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


  loadMorePhotos = (paginationUrl) => {
    return new Promise((resolve, reject) => {
      axios.get(paginationUrl)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch(error => reject(error));
    });
  }
}

export default new InstagramLogin();