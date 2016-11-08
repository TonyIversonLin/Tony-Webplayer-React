'use strict';
import * as types from '../action/actionType';

export function artists(state = [], action) {
	switch(action.type) {
		case types.RECEIVE_ARTISTS_FROM_SERVER:
			return action.artists;
		default:
			return state;
	}
}

export function currentArtist(state = {}, action) {
	switch(action.type) {
		case types.RECEIVE_SINGLE_ARTIST_FROM_SERVER:
			return action.artist;
		default:
			return state;
	}
}