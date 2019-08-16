import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/MyApp';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
	settings
} from './constants';
// import {store} from './redux-store';
// import {Provider} from 'react-redux';

// loading default settings before loading the app


settings.loadSettings().then( () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root'));
	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
