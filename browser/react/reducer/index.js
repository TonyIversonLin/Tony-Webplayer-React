'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'

const rootReducer = combineReducers({
	albums,
	currentAlbum,
	currentSong,
	currentSongList,
	isPlaying
});

export default rootReducer;