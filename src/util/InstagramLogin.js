// const createFirebaseAccount = require('../components/rebaseConfig/createFirebaseAccount');
// const signInFirebaseTemplate = require('../components/rebaseConfig/signInFirebaseTemplate');
const firebase = require('firebase');

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
  
};
let  proGallery = {};
// const createFirebaseAccount = require('./components/rebaseConfig/createFirebaseAccount')


/**
 *   This method uses the implicit authorization flow which is less secure than the explicit (server-sided) 
 *   authorization flow, however, it does not require server sided authentication.  We will rely on firebase
 *   for that.
 */



const InstagramLogin = {
  getAccessToken() {
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
    firebase.auth().signInWithCustomToken(`${accessToken}`).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(error) {
        console.log(errorMessage, errorCode)
      }
      // ...
    });
   
  },
  
  async fetchUserInfo() {
    if(!accessToken) {
      this.getAccessToken();
    }
    
    const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=6`;
    try {
      let response = await fetch(token_url, {
        method: 'GET'
      });
      if (response.ok) {
        console.log(response);
        jsonResponse = await response.json();
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
          instagramUser.slides = jsonResponse.data.map(info=> ({
            src: info.images.standard_resolution.url,
            id: info.id,
            
            title: info.caption ? info.caption.text : '',

          }));
          instagramUser.image = jsonResponse.data.map(info => ({
            src: info.images.standard_resolution.url,
            // id: info.id
          }));
            return instagramUser;

      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
   
  },
  async getProGallery() {
    if(!accessToken) {
      this.getAccessToken();
    }
    
    const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=20`;
    try {
      let response = await fetch(token_url, {
        method: 'GET'
      });
      if (response.ok) {
        console.log(response);
        jsonResponse = await response.json();
        proGallery = jsonResponse.data.map(info => ({
          src: info.images.standard_resolution.url,
          // title: info.caption ? info.caption.text : '',
          id: info.id,
          // url: '',
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
  },
    

  logout() {
    const Match = window.location.href.match(/access_token=([^&]*)/);
    if (Match) {
      //set access token to regex match group
      accessToken = null;
      return accessToken;
    } else {
      //use redirect instead of popup window
     window.location = log_out_url;
    }
   
  }
 
   
}

export default InstagramLogin;
