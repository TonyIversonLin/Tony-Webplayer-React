'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import AddSongForm from '../component/AddSongForm';
import { toggleOne } from '../action/albumActions'
import { postNewSongToPlaylist } from '../action/playlistActions'

class PlaylistContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedSong: '',
			invalid: true
		}
		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
	}

	update(event) {
		let selectedSong = parseInt(event.target.value);
		this.setState({selectedSong, invalid: false});
	}

	submit(event) {
		event.preventDefault();
		this.props.addSong(this.props.currentPlaylist.id, this.state.selectedSong);
		this.setState({selectedSong: '', invalid: true})
	}

	render() {
		return (
			<div>
				<hr/>
				<AddSongForm selectedSong={this.state.selectedSong}
										 invalid={this.state.invalid}
										 onChange={this.update}
										 allSongs={this.props.songs}
										 submit={this.submit} />
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
	return {
		playSong: (song, songList) => dispatch(toggleOne(song, songList)),
		addSong: (playlistID, songID) => dispatch(postNewSongToPlaylist(playlistID,songID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer)