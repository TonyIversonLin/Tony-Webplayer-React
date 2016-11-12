'use strict';
import * as types from '../action/actionType';

export function songs(state = [], action) {
	switch(action.type) {
		case types.RECEIVE_ALL_SONGS:
			return action.songs;
		default:
			return state;
	}
}