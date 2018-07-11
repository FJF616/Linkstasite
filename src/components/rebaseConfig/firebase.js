import Rebase from 're-base';
import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyDsQ1r5hgfllHJFlZVjBwI2Bp8btznK5Os",
    authDomain: "linkstasitecs5-18740.firebaseapp.com",
    databaseURL:"https://linkstasitecs5-18740.firebaseio.com",
    projectId: "linkstasitecs5-18740",
    storageBucket: '',
    messagingSenderId: "633569245331",
    // apiKey: process.env.REACT_APP_FIREBASE_KEY,
    // authDomain:process.env.REACT_APP_FIRBASE_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_SENDER_ID
  };
  
  const devConfig = {
    apiKey: "AIzaSyDkT8JAvL8ZK7CtnhKI7rJUbvtRrvDJou0",
      authDomain: "linkstasite-dev.firebaseapp.com",
      databaseURL: "https://linkstasite-dev.firebaseio.com",
      projectId: "linkstasite-dev",
      storageBucket: "gs://linkstasite-dev.appspot.com",
      messagingSenderId: "178394875945"
  };
  
  const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

  if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

const db = firebase.database();
const base = Rebase.createClass(db);
const auth = firebase.auth();
const storage = firebase.storage();
//.ref('images');
//  export const facebookProvider = new firebase.auth.FacebookAuthProvider()

 export { base, db, auth, storage };