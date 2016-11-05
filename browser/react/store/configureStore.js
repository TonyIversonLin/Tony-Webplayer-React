'use strict';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducer';
import initialState from '../initialState';

export default function configureStore() {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(createLogger(), thunkMiddleware)
	);
}