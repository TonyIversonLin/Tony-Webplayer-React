'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Artist from '../component/Artist';
import { toggleOne } from '../action/albumActions'

const mapStateToProps = (state, ownProps) => {
	let { albums, artist } = state.currentArtist;
	let {currentSong} = state
	return {
		albums,
		artist,
		currentSong
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		playSong: (song, songList) => dispatch(toggleOne(song, songList))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);