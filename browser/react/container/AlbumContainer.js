'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Album from '../component/Album';
import { toggleOne } from '../action/albumActions'

const mapStateToProps = (state, ownProps) => {
	return {
		album: state.currentAlbum,
		currentSong: state.currentSong
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		playSong: (song, songList) => dispatch(toggleOne(song, songList))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);