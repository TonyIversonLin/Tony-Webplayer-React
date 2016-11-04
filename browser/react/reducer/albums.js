'use strict';

import * as types from '../action/actionType';

export function albums(state = {}, action) {
	switch(action.type) {
		case types.RECEIVE_ALBUMS_FROM_SERVER:
			return Object.assign({}, state, {albums: action.albums})
		default:
		 return state
	}
}