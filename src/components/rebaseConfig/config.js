import Rebase from 're-base';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
// import dotenv from 'dotenv';
import 'firebase/database';
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
      storageBucket: "",
      messagingSenderId: "178394875945"
  };
  
  const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;
 
 export const app = firebase.initializeApp(config)
 export const db = app.database();
 const base = Rebase.createClass(db);
 export const auth = firebase.auth();
//  export const facebookProvider = new firebase.auth.FacebookAuthProvider()

 export { base };