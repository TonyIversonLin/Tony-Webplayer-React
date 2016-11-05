'use strict';

const initialState = {
	albums: [{
		id: 0,
		name: '',
		songs: []
	}],
  album: {},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0
};

export default initialState;
