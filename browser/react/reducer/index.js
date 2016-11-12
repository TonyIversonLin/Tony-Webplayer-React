'use strict';
import { combineReducers } from 'redux';
import { albums } from './albums';
import {currentAlbum, currentSong, currentSongList, isPlaying} from './album'
import {artists, currentArtist} from './artists'
import { playlists, currentPlaylist } from './playlists'
import { songs } from './songs'

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
	songs
});

export default rootReducer;