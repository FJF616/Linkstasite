import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
// import PictureUploader from './components/Pictures/PictureUploader'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();