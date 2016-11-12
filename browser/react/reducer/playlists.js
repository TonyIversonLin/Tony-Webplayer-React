'use strict';
import * as types from '../action/actionType';

export function playlists(state = [], action) {
	switch(action.type) {
		case types.RECEIVE_NEW_PLAYLIST:
			return [...state, Object.assign({}, action.playlist)];
		default:
			return state;
	}
}
