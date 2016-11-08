'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'
import {artists, currentArtist} from './artists'

const rootReducer = combineReducers({
	artists,
	currentArtist,
	albums,
	currentAlbum,
	currentSong,
	currentSongList,
	isPlaying
});

export default rootReducer;