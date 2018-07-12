import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
// import PictureUploader from './components/Pictures/PictureUploader'
// import PictureList from './components/Pictures/PictureList'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();