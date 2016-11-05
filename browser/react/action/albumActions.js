'use strict'
import * as types from './actionType';

export function receiveAlbums(albums) {
	return {
		type: types.RECEIVE_ALBUMS_FROM_SERVER,
		albums: albums
	}
}