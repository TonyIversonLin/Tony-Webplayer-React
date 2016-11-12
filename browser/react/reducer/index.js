'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'
import {artists, currentArtist} from './artists'
import { playlists, currentPlaylist } from './playlists'

const rootReducer = combineReducers({
	artists,
	currentArtist,
	albums,
	currentAlbum,
	currentSong,
	currentSongList,
	isPlaying,
	playlists,
	currentPlaylist
});

export default rootReducer;