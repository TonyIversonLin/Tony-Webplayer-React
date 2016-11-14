'use strict';
import * as types from '../action/actionType';

export function error(state = '', action) {
	switch(action.type) {
		case types.SERVER_ERROR:
			return action.error;
		default:
			return state;
	}
}