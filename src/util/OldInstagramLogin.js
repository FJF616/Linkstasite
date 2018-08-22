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
let proGallery = {};
let firebaseToken;
// const createFirebaseAccount = require('./components/rebaseConfig/createFirebaseAccount')


/**
 *   This method uses the implicit authorization flow which is less secure than the explicit (server-sided) 
 *   authorization flow, however, it does not require server sided authentication.  We will rely on firebase
 *   for that.
 */



const InstagramLogin = {
  createFirebaseToken(instagramID) {
    instagramID = instagramUser.user.instagramUserID
    // The uid we'll assign to the user.
    const uid = `instagram:${instagramID}`;
  
    // Create the custom token.
    return firebase.auth().createCustomToken(uid);
  },
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
   signInFirebaseTemplate(token, displayName, photoURL, instagramAccessToken) {
    return `
      <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
      <script src="promise.min.js"></script><!-- Promise Polyfill for older browsers -->
      <script>
        var token = '${token}';
        var config = {
          apiKey: MY_FIREBASE_API_KEY, // Change this!
          databaseURL: MY_DATABASE_URL // Change this!
        };
        // We sign in via a temporary Firebase app to update the profile.
        var tempApp = firebase.initializeApp(config, '_temp_');
        tempApp.auth().signInWithCustomToken(token).then(function(user) {
       
          // Saving the Instagram API access token in the Realtime Database.
          const tasks = [tempApp.database().ref('/instagramAccessToken/' + user.uid)
              .set('${instagramAccessToken}')];
     
          // Updating the displayname and photoURL if needed.
          if ('${displayName}' !== user.displayName || '${photoURL}' !== user.photoURL) {
            tasks.push(user.updateProfile({displayName: '${displayName}', photoURL: '${photoURL}'}));
          }
     
          // Wait for completion of above tasks.
          return Promise.all(tasks).then(function() {
            // Delete temporary Firebase app and sign in the default Firebase app, then close the popup.
            var defaultApp = firebase.initializeApp(config);
            Promise.all([
                defaultApp.auth().signInWithCustomToken(token),
                tempApp.delete()]).then(function() {
              window.close(); // We’re done! Closing the popup.
            });
          });
        });
      </script>`;
   },
  async getProGallery() {
    // if(!accessToken) {
    //   this.getAccessToken();
    // }
    
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
          }))
          firebaseToken = this.createFirebaseToken(instagramUser.user.instagramUserID);  
          return instagramUser;

      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
   this.signInFirebaseTemplate(firebaseToken, instagramUser.user.userName, instagramUser.user.profilePic, accessToken);
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
