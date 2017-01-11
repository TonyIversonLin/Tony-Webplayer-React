'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import AddSongForm from '../component/AddSongForm';
import { toggleOne } from '../action/albumActions'
import { postNewSongToPlaylist, deleteSongFromPlaylist } from '../action/playlistActions'

class PlaylistContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedSong: '',
			invalid: true,
			currentPlaylist: Object.assign({},this.props.currentPlaylist)
		}
		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
	}

	onDragStart(event){
		console.log('start dragging',event.target.dataset.order);
		let dragTragetOrder = event.target.dataset.order;
		event.dataTransfer.setData('Text',dragTragetOrder.toString());
	}

	cancel(event){
		event.preventDefault();
		event.stopPropagation();
	}

	onDragEnter(event){
		this.cancel(event);
	}

	onDragOver(event){
		this.cancel(event);
	}

	onDrop(event){
		console.log('drop happening',event.target.parentElement.dataset.order,event.dataTransfer.getData('Text'));
		let dropTargetOrder = event.target.parentElement.dataset.order;
		let dragTargetOrder = event.dataTransfer.getData('text');
	}

	componentWillReceiveProps(nextProps){
		this.setState({currentPlaylist: Object.assign({},this.props.currentPlaylist)});
	}

	update(event) {
		let selectedSong = event.target.value;
		this.setState({selectedSong, invalid: false});
	}

	submit(event) {
		event.preventDefault();
		let song = this.props.songs.filter(song => song.name===this.state.selectedSong)
		let songId = song[0].id
		this.props.addSong(songId);
		this.setState({selectedSong: '', invalid: true})
	}

	render() {
		console.log('state play list', this.state.currentPlaylist);
		return (
			<div>
				<hr/>
				<AddSongForm selectedSong={this.state.selectedSong}
										 invalid={this.state.invalid}
										 onChange={this.update}
										 allSongs={this.props.songs}
										 submit={this.submit} />
				<Playlist currentPlaylist = {this.state.currentPlaylist}
									currentSong = {this.props.currentSong}
									playSong = {this.props.playSong} 
									deleteSong= {this.props.deleteSong} 
									draggable={true} 
									onDragStart={this.onDragStart}
									onDrop={this.onDrop}
									onDragEnter={this.onDragEnter}
									onDragOver={this.onDragOver}
									/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let {currentSong, currentPlaylist, songs} = state;
	let newCurrentPlaylist = currentPlaylist.songs.forEach((song,index)=>{
		song.order = index;
	})
	console.log('I want the detail of currentPlaylist',currentPlaylist);
	return {currentSong, currentPlaylist, songs}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	let playlistID = ownProps.params.id;
	return {
		playSong: (song, songList) => dispatch(toggleOne(song, songList)),
		addSong: (songID) => dispatch(postNewSongToPlaylist(playlistID,songID)),
		deleteSong: (songID) => dispatch(deleteSongFromPlaylist(playlistID,songID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer)