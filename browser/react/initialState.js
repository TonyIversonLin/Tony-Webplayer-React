'use strict';

const initialState = {
	artists: [{name: ''}],
  currentArtist: {},
	albums: [{
		id: 0,
		name: '',
		songs: []
	}],
  currentAlbum: {songs: []},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0
};

export default initialState;
