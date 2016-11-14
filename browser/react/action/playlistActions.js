'use strict';
import * as types from './actionType';
import { postObject } from '../Utility';
import { errorFromServer } from './errorActions';

export function receiveNewPlaylist(playlist) {
	return {
		type: types.RECEIVE_NEW_PLAYLIST,
		playlist: playlist
	}
}

export function createNewPlayList(playlist) {
	return dispatch => {
		return fetch('/api/playlists', postObject({name: playlist}))
			.then(res => res.json())
			.then(newPlaylistFromServer => {
				dispatch(receiveNewPlaylist(newPlaylistFromServer));
				return newPlaylistFromServer;
			})
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

export function addSongToPlaylist (song) {
	return {
		type: types.UPDATE_SINGLE_PLAYLIST,
		song: song
	}
}

export function postNewSongToPlaylist (playlistID, songID) {
	return dispatch => {
		fetch('/api/playlists/'+playlistID+'/songs', postObject({id: songID}))
			.then(res => res.status===201 ? res.json() : res.text())
			.then(newSongFromServer => {
				if(typeof newSongFromServer ==='object') {
					newSongFromServer.url = `/api/songs/${newSongFromServer.id}/audio`;
					dispatch(addSongToPlaylist(newSongFromServer));
				} else {
					dispatch(errorFromServer(newSongFromServer));
				}
			}).catch(error => console.log(error));
	}
}

