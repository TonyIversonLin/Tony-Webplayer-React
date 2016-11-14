'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'
import {artists, currentArtist} from './artists'
import { playlists, currentPlaylist } from './playlists'
import { songs } from './songs'
import { error } from './error'

const rootReducer = combineReducers({
	artists,
	currentArtist,
	albums,
	currentAlbum,
	currentSong,
	currentSongList,
	isPlaying,
	playlists,
	currentPlaylist,
	songs,
	error
});

export default rootReducer;