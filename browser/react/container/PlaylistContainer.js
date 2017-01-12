'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import AddSongForm from '../component/AddSongForm';
import { toggleOne } from '../action/albumActions'
import { postNewSongToPlaylist, deleteSongFromPlaylist } from '../action/playlistActions'
import { rearrageOrder } from '../Utility'

class PlaylistContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedSong: '',
			invalid: true,
			currentPlaylist: Object.assign({},this.props.currentPlaylist)
		}
		this.lastLeavePosition = 0;

		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
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
		let dragTargetOrder = parseInt(event.dataTransfer.getData('text'));
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);
		tempCurrentPlaylist = rearrageOrder(tempCurrentPlaylist, dragTargetOrder, dropTargetOrder);
		this.setState({currentPlaylist: tempCurrentPlaylist});
	}

	onDragLeave(event){
		console.log('leaving happening',event.target.parentElement.dataset.order);
		this.lastLeavePosition = event.target.parentElement.dataset.order;
	}

	componentWillReceiveProps(nextProps){
		this.setState({currentPlaylist: Object.assign({},nextProps.currentPlaylist)});
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
									onDragLeave={this.onDragLeave}
									/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let {currentSong, currentPlaylist, songs} = state;
	currentPlaylist.songs.forEach((song,index)=>{
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