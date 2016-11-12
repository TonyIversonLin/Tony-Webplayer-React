'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import { toggleOne } from '../action/albumActions'

const mapStateToProps = (state, ownProps) => {
	let {currentSong, currentPlaylist} = state;
	return {currentSong, currentPlaylist}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {playSong: (song, songList) => dispatch(toggleOne(song, songList))}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)