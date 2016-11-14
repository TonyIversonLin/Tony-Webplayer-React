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
			return action.currentSongList;
		case types.UPDATE_SINGLE_PLAYLIST:
		 	return [...state, action.song];
		case types.DELETE_SONG_PLAYLIST:
			return [...state.filter(song => song.id !== action.id)];
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

export function currentAlbum(state = {}, action) {
	switch(action.type) {
		case types.SET_CURRENT_ALBUM: return action.currentAlbum
		default: return state
	}
}