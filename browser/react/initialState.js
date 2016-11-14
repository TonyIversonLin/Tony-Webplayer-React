'use strict';

const initialState = {
	artists: [{name: ''}],
  currentArtist: {artist: {name: ''}, albums: [], songs: []},
	albums: [{
		id: 0,
		name: '',
		songs: []
	}],
  currentAlbum: {songs: []},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  playlists: [],
  currentPlaylist: {name: '', songs: []},
  songs: [],
  error: ''
  //progress: 0
};

export default initialState;
