'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './container/Main';
import { createStore } from 'redux';
import {albums} from './reducer/albums';

let store = createStore(albums);

store.getState() // { albums: [] }
store.dispatch({ type: 'RECEIVE_ALBUMS_FROM_SERVER', albums: [{artist: 'jav', songs: []}/* some albums */] })
console.log(store.getState()) // { albums: [ /* some albums */ ] }

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)

console.log('Hello React');