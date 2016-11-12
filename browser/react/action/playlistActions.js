'use strict';
import * as types from './actionType';
import { postObject } from '../Utility'

export function receiveNewPlaylist(playlist) {
	return {
		type: types.RECEIVE_NEW_PLAYLIST,
		playlist: playlist
	}
}

export function createNewPlayList(playlist) {
	return dispatch => {
		console.log('getting in here...........')
		// let header = new Headers();
		// header.append('Content-Type', 'application/json');
		// fetch('/api/playlists', { 
		// 	method: 'POST', 
		// 	headers: header,
		// 	mode: 'cors',
		// 	cache: 'default',
		// 	body: JSON.stringify({name: playlist})
		// })
		fetch('/api/playlists', postObject({name: playlist}))
			.then(res => res.json())
			.then(newPlaylistFromServer => dispatch(receiveNewPlaylist(newPlaylistFromServer)))
			.catch(err => console.log(err));
	}
}