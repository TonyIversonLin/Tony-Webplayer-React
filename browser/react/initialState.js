'use strict';

const initialState = {
	albums: [{
		id: 0,
		name: '',
		songs: []
	}],
  currentAlbum: {},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0
};

export default initialState;
