'use strict';
import * as types from '../action/actionType';

export function currentSong(state = {}, action) {
	switch(action.type) {
		case types.SET_CURRENT_SONG:
			return action.currentSong;
		default:
			return state
	}
} 

export function currentSongList(state = [], action) {
	switch(action.type) {
		case types.SET_CURRENT_SONG:
			return action.currentSongList
		default:
			return state
	}
}

export function isPlaying(state = false, action) {
	switch(action.type) {
		case types.START_PLAYING: return true;
		case types.STOP_PLAYING: return false;
		default: return state;
	}
}