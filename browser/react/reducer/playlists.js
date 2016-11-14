'use strict';
import * as types from '../action/actionType';

export function playlists(state = [], action) {
	switch(action.type) {
		case types.RECEIVE_ALL_PLAYLIST:
			return action.playlists;
		case types.RECEIVE_NEW_PLAYLIST:
			return [...state, Object.assign({}, action.playlist)];
		default:
			return state;
	}
}

export function currentPlaylist(state = [], action) {
	switch(action.type) {
		case types.RECEIVE_SINGLE_PLAYLIST:
			return action.playlist;
		case types.UPDATE_SINGLE_PLAYLIST:
			return Object.assign({}, state, {songs: [...state.songs, action.song]});
		case types.DELETE_SONG_PLAYLIST:
			return Object.assign({}, state, {songs: [
				...state.songs.filter(song => song.id !== action.id)]});
		default:
			return state;
	}
}
