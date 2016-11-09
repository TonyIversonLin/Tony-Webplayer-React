'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
//import Main from './container/Main';
//import AlbumsContainer from './container/AlbumsContainer';
import routes from './routes';

let store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>{routes(store)}</Router>
	</Provider>,
	document.getElementById('app')
)

console.log('Hello React');