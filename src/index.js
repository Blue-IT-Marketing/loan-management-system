/* eslint-disable no-unused-vars */
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/MyApp';
import './index.css';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line no-unused-vars
import UserAccountContextProvider from './context/UserAccount/userAccountContext';
// import {store} from './redux-store';
// import {Provider} from 'react-redux';

// loading default settings before loading the app



ReactDOM.render(
	<UserAccountContextProvider>
		<App />
	</UserAccountContextProvider> ,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
