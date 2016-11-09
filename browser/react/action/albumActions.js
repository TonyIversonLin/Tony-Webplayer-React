'use strict';
import * as types from './actionType';
import {AUDIO, playMusic, changeSong, forcePosition} from '../Utility';

export function receiveAlbums(albums) {
	return {
		type: types.RECEIVE_ALBUMS_FROM_SERVER,
		albums: albums
	}
}

export function fetchAlbumsFromServer () {
	return function (dispatch) {     // the thunk middle ware will put the dispatch method(from store) inside
		fetch('/api/albums')
			.then(res => res.json())
			.then(albumsFromServer => {
				let albumsList = albumsFromServer.map(album => {
					album.imageUrl = `/api/albums/${album.id}/image`;
					return album;
				});				
				dispatch(receiveAlbums(albumsList));
			})
	}
}


export function startPlaying () {
	return {
		type: types.START_PLAYING
	}
}

export function stopPlaying () {
	return {
		type: types.STOP_PLAYING
	}
}

export function setCurrentSong (currentSong, currentSongList) {
	return {
		type: types.SET_CURRENT_SONG,
		currentSong,
		currentSongList
	}
}

export function play() {
	return dispatch => {
		AUDIO.play();
		dispatch(startPlaying());
	}
}

export function pause() {
	return dispatch => {
		AUDIO.pause();
		dispatch(stopPlaying());
	}
}

export function load(currentSong, currentSongList) {
	return dispatch => {
		AUDIO.src = currentSong.url;
		AUDIO.load();
		dispatch(setCurrentSong(currentSong, currentSongList));
	}
}

export function startSong(song, list) {
	return dispatch => {
		dispatch(pause());
		dispatch(load(song, list));
		dispatch(play());
	}
}

export function toggle() {
	return (dispatch, getState) => {
		const { isPlaying } = getState();
		if(isPlaying) dispatch(pause());
		else dispatch(play());
	}
}

export function toggleOne(selectedSong, selectedSongList) {
	return (dispatch, getState) => {
		const { currentSong } = getState();
		if( currentSong.id !== selectedSong.id)
			dispatch(startSong(selectedSong, selectedSongList));
		else dispatch(toggle());  
	}
}

export function switchSong(type) {
	return (dispatch, getState) => {
		let { currentSong, currentSongList} = getState();
		let nextSong = changeSong(type, currentSongList, currentSong);
		dispatch(startSong(nextSong, currentSongList));
	}
}

export function setCurrentAlbum(currentAlbum) {
	return {
		type: types.SET_CURRENT_ALBUM,
		currentAlbum
	}
}

export function fetchSingleAlbum(albumId) {
	return dispatch => {
		//console.log('I am here', dispatch)
		fetch('api/albums/'+albumId)
			.then(res => res.json())
			.then(albumFromServer => {
				albumFromServer.imageUrl = `/api/albums/${albumFromServer.id}/image`;
				//console.log('about to set current album');
				dispatch(setCurrentAlbum(albumFromServer));
			})
	}
}