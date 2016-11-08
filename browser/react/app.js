'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Main from './container/Main';
import AlbumsContainer from './container/AlbumsContainer';

let store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>,
	document.getElementById('app')
)

console.log('Hello React');