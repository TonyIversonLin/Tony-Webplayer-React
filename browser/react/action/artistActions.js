'use strict';
import * as types from './actionType';

export function receiveArtists(artists) {
	return {
		type: types.RECEIVE_ARTISTS_FROM_SERVER,
		artists: artists
	}
}

export function receiveSingleArtist(artist) {
	return {
		type: types.RECEIVE_SINGLE_ARTIST_FROM_SERVER,
		artist: artist
	}
}

export function fetchArtists() {
	return dispatch => {
		fetch('/api/artists')
			.then(res => res.json())
			.then(artistsFromSever => dispatch(receiveArtists(artistsFromSever)))
			.catch(error => console.log(error));
	}
}

export function fetchSingleArtist(artistID) {
	return dispatch => {
		let fetchingArtist = fetch('/api/artists/'+artistID);
		let fetchingAlbums = fetch('/api/artists/'+artistID+'/albums');
		let fetchingSongs = fetch('/api/artists/'+artistID+'/songs');
		Promise.all([fetchingArtist,fetchingAlbums,fetchingSongs])
			.then(results => results.map(result => result.json())
			.then(cleanResults => {
				let artist = cleanResults[0];
				let albums = cleanResults[1].map(album => {
					album.imageUrl = `/api/albums/${album.id}/image`;
					return album;
				});
				let songs = cleanResults[2];
				dispatch(receiveSingleArtist({
					artist,
					albums,
					songs
				}))
			})
	}
}