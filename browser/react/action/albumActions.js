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
		audio.play();
		dispatch(startPlaying());
	}
}

export function pause() {
	return dispatch => {
		audio.pause();
		dispatch(stopPlaying());
	}
}

export function load(currentSong, currentSongList) {
	return dispatch => {
		audio.src = currentSong.audioUrl;
		audio.load();
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
		const { playingStatus } = getState();
		if(playingStatus) dispatch(pause);
		else dispatch(play);
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