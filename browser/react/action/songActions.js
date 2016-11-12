'use strict';
import * as types from './actionType';

export function receiveAllSongs(songs) {
	return {
		type: types.RECEIVE_ALL_SONGS,
		songs: songs
	}
}

export function fetchAllSongs() {
	return dispatch => {
		fetch('/api/songs')
			.then(res => res.json())
			.then(songsFromServer => dispatch(receiveAllSongs(songsFromServer)))
			.catch(err => console.log(err));
	}
}
