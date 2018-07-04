import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import store from './components/stores';
// import '@blueprintjs/core/dist/blueprint.css';
import 'normalize.css/normalize.css';

ReactDOM.render(
    <Provider { ...store }>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
