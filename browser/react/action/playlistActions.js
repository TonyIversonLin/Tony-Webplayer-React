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
		fetch('/api/playlists', postObject({name: playlist}))
			.then(res => res.json())
			.then(newPlaylistFromServer => dispatch(receiveNewPlaylist(newPlaylistFromServer)))
			.catch(err => console.log(err));
	}
}

export function receiveAllPlaylist (playlists) {
	return {
		type: types.RECEIVE_ALL_PLAYLIST,
		playlists: playlists
	}
}

export function fetchAllPlaylists () {
	return dispatch => {
		fetch('/api/playlists')
			.then(res => res.json())
			.then(playlistsFromServer => dispatch(receiveAllPlaylist(playlistsFromServer)))
			.catch(err => console.log(err))
	}
} 

export function receiveSinglePlaylist (playlist) {
	return {
		type: types.RECEIVE_SINGLE_PLAYLIST,
		playlist: playlist
	}
}

export function fetchSinglePlaylist (playlistID) {
	return dispatch => {
		fetch('/api/playlists/'+playlistID)
			.then(res => res.json())
			.then(playlistFromServer => dispatch(receiveSinglePlaylist(playlistFromServer)))
			.catch(error => console.log(error));
	}
}



