'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentSong, currentSongList, isPlaying} from './album'

const rootReducer = combineReducers({
	albums,
	currentSong,
	currentSongList,
	isPlaying
});

export default rootReducer;