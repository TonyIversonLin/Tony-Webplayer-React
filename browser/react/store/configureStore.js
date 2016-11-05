'use strict';
import { createStore, applyMiddleware } from 'redux';
import { albums } from '../reducer/albums';
import initialState from '../initialState';
import createLogger from 'redux-logger';

export default function configureStore() {
	return createStore(
		albums,
		initialState,
		applyMiddleware(createLogger())
	);
}