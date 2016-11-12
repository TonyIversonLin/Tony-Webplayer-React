'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import AddSongForm from '../component/AddSongForm';
import { toggleOne } from '../action/albumActions'

class PlaylistContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedSong: '',
			invalid: true
		}
		this.update = this.update.bind(this);
	}

	update(event) {
		let selectedSong = parseInt(event.target.value);
		this.setState({selectedSong, invalid: false});
	}

	render() {
		console.log('I am here');
		return (
			<div>
				<AddSongForm selectedSong={this.state.selectedSong}
										 invalid={this.state.invalid}
										 onChange={this.update}
										 allSongs={this.props.songs}/>
				<Playlist currentPlaylist = {this.props.currentPlaylist}
									currentSong = {this.props.currentSong}
									playSong = {this.props.playSong} />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let {currentSong, currentPlaylist, songs} = state;
	return {currentSong, currentPlaylist, songs}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {playSong: (song, songList) => dispatch(toggleOne(song, songList))}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer)