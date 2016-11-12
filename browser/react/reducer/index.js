'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'
import {artists, currentArtist} from './artists'
import {playlists} from './playlists'

const rootReducer = combineReducers({
	artists,
	currentArtist,
	albums,
	currentAlbum,
	currentSong,
	currentSongList,
	isPlaying,
	playlists
});

export default rootReducer;