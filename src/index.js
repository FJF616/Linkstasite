import React from 'react';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import ReactDOM from 'react-dom';
// import ShortenLink from '../src/util/Bitly'
import './index.css';
import Bitlink from './util/BitlyHelper'
import InstagramProvider from './components/Session/InstagramProvider';
// import EditableTable from './components/FormInputs/EditableTable'
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
// import NewPara from './components/NewPara/NewPara'

// const config = {
//   projectId: 'linkstasite-dev',
//   apiKey: 'AIzaSyDkT8JAvL8ZK7CtnhKI7rJUbvtRrvDJou0' 
// };


ReactDOM.render(
    <FirestoreProvider firebase={firebase}>
    <InstagramProvider>
        <App/>
        </InstagramProvider>
    </FirestoreProvider>,
     document.getElementById('root'));
    registerServiceWorker();