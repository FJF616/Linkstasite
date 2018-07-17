
// const createFirebaseAccount = require('../components/rebaseConfig/createFirebaseAccount');
// const signInFirebaseTemplate = require('../components/rebaseConfig/signInFirebaseTemplate');
const React    = require('react')
const ReactDOM = require('react-dom')
const config = require('../components/rebaseConfig/config.json');
const firebase = require('firebase');
// const {auth,  db} = require('../components/rebaseConfig/firebase')
const admin = require('firebase-admin');
const serviceAccount = require('../components/rebaseConfig/service-account.json');
const createReactClass = require('create-react-class');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
const redirectURI = "http://localhost:3000/"
const client_id = "0d744e65869b4acc8dde4d6e3c6a58e2";
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;
let accessToken;
let jsonResponse;
let instagramUser = {
  user: {},
  gallery:{},
  slides: {},
  links:{}
};

const user = instagramUser.user;
const instagramUserID = user.instagramUserID;
const instagramTokenRef = firebase.database().ref('/instagramAccessToken/' + user.uid);


/**
 *   This method uses the implicit authorization flow which is less secure than the explicit (server-sided) 
 *   authorization flow, however, it does not require server sided authentication.  We will rely on firebase
 *   for that.
 */
// firebase.auth().onAuthStateChanged = function(user) {
//   // Skip token refresh.
 
//   if(user && user.uid === this.lastUid) return;
//   if (user) {
//        this.lastUid = user.uid;
//        this.instagramTokenRef = firebase.database().ref('/instagramAccessToken/' + user.uid);
//   } else {
//     this.lastUid = null;
//   }
// };

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
   
  },
  
  async fetchUserInfo() {
  
    if (!accessToken) {
      this.getAccessToken();
    } 
   
    const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=5`;
    try {
      let response = await fetch(token_url, {
        method: 'GET'
      });
      if (response.ok) {
        console.log(response);
        
        jsonResponse = await response.json();
        instagramUser.user = jsonResponse.data.map(info => ({
          id: info.id,
          // image: info.images.standard_resolution.url,
          instagramUserID: info.user.id,
          url: info.link,
          title: info.caption ? info.caption.text : '',
          profilePic: info.user.profile_picture,
          userName:info.user.full_name,
          favorite: false,
          access_token: `${accessToken}`,
          likes: info.likes.count,
          tags: info.tags
        }));
          instagramUser.gallery = jsonResponse.data.map(info => ({
            src: info.images.standard_resolution.url,
            title: info.caption ? info.caption.text : '',
            id: info.id,
            url: info.link,
            affiliateLink: '',
            favorite: false,
            editing: false,
            edited: false,
            filled: false
          }));
          instagramUser.slides = jsonResponse.data.map(info=> ({
            src: info.images.standard_resolution.url
          }));
          instagramUser.links = jsonResponse.data.map(info=> ({
            src:info.src,
            affiliateLink:'',
            title: info.caption ? info.caption.text : '',
          }));
            return instagramUser;

      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
   
  }
}
const CreateFirebaseAccount =   createReactClass ({
  getInitialState: function(){
        
    // The pictures array will be populated via AJAX, and 
    // the favorites one when the user clicks on an image:
    
    return { user:{} };
},

componentWillMount: function(){
    // firebase.auth().onAuthStateChanged();
    InstagramLogin.fetchUserInfo();
    // When the component loads, send a jQuery AJAX request
   
    
    InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
       user: instagramUser.user

    }));
    console.log(this.state.user)
    // The UID we'll assign to the user.
   
    const uid = `instagram:7687466936`;
  
    // Save the access token tot he Firebase Realtime Database.
    const databaseTask = firebase.database().ref(`/instagramAccessToken/${uid}`)
        .set(accessToken);
  
    // Create or update the user account.
    const userCreationTask = admin.auth().updateUser(uid, {
      displayName: instagramUser.user.userName,
      photoURL: instagramUser.user.profilePic
    }).catch(error => {
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: uid,
          displayName: instagramUser.user.userName,
          photoURL: instagramUser.user.profilePic
        });
      }
      throw error;
    });
  
    // Wait for all async task to complete then generate and return a custom auth token.
    return Promise.all([userCreationTask, databaseTask]).then(() => {
      // Create a Firebase custom auth token.
      const token = admin.auth().createCustomToken(uid);
      console.log('Created Custom token for UID "', uid, '" Token:', token);
      return token;
    });
  },

  /**
   * Generates the HTML template that signs the user in Firebase using the given token and closes the
   * popup.
   */
   render: function(token) {
    instagramTokenRef.once('value').then(function(snapshot) {
        accessToken = snapshot.val();
   }).catch(err =>{
       if(!err){
           console.log('success')
       }
   })
    return `
      <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
      <script>
        var token = '${token}';
        var config = {
          apiKey: '${config.firebase.apiKey}'
        };
        var app = firebase.initializeApp(config);
        app.auth().signInWithCustomToken(token).then(function() {
          window.close();
        });
      </script>`;
  }
})
ReactDOM.render(<CreateFirebaseAccount/>,document.getElementById('root'))


    // Serve an HTML page that signs the user in and updates the user profile.
  
 

export default InstagramLogin;
