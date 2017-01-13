'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Playlist from '../component/Playlist';
import AddSongForm from '../component/AddSongForm';
import { toggleOne } from '../action/albumActions'
import { postNewSongToPlaylist, deleteSongFromPlaylist } from '../action/playlistActions'
import { sortable } from '../Utility'

class PlaylistContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedSong: '',
			invalid: true,
			currentPlaylist: Object.assign({},this.props.currentPlaylist),
			dropline: {show: false, index: 0, up: false}
		}
		this.dragTargetOrder = undefined;
		this.enterTargetOrder = undefined;
		this.lastLeavePosition = undefined;
		this.swapstatus = false;
		this.droplineIndex = undefined;

		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragStart(event){
		this.dragTargetOrder = parseInt(event.target.dataset.order);
	}

	cancel(event){
		event.preventDefault();
		event.stopPropagation();
	}

	onDragEnter(event){
		this.cancel(event);

		this.enterTargetOrder = sortable.targetOrder(event);
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);

		sortable.deleteDropline(tempCurrentPlaylist,this.droplineIndex);
		this.droplineIndex = sortable.createDropRegion(tempCurrentPlaylist, this.dragTargetOrder, this.enterTargetOrder)

		this.setState({currentPlaylist: tempCurrentPlaylist});
	}

	onDragOver(event){
		this.cancel(event);
	}

	onDrop(event){
		this.swapstatus = false;

		let dropTargetOrder = sortable.targetOrder(event); 
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);

		sortable.deleteDropline(tempCurrentPlaylist,this.droplineIndex);
		this.droplineIndex = undefined;

		tempCurrentPlaylist = sortable.rearrageOrder(tempCurrentPlaylist, this.dragTargetOrder, dropTargetOrder);
		this.setState({currentPlaylist: tempCurrentPlaylist});
	}

	onDragLeave(event){
		this.swapstatus = true;
	}

	onDragEnd(event){
		if(!this.swapstatus) return;
		
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);
		
		sortable.deleteDropline(tempCurrentPlaylist,this.droplineIndex);
		this.droplineIndex = undefined;

		tempCurrentPlaylist = sortable.rearrageOrder(tempCurrentPlaylist, this.dragTargetOrder, this.enterTargetOrder);
		this.setState({currentPlaylist: tempCurrentPlaylist});
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
									onDragEnd={this.onDragEnd}
									dropline={this.state.dropline}
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