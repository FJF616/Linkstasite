import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import '@blueprintjs/core/dist/blueprint.css';
import 'normalize.css/normalize.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
