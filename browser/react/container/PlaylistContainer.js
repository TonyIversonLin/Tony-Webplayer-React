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
			currentPlaylist: Object.assign({},this.props.currentPlaylist),
			dropline: {show: false, index: 0, up: false}
		}
		this.dragIndex = undefined;
		this.dragEnterIndex = undefined;
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
		console.log('start dragging',event.target.dataset.order);
		let dragTragetOrder = event.target.dataset.order;
		this.dragIndex = parseInt(dragTragetOrder);
		event.dataTransfer.setData('Text',dragTragetOrder.toString());
	}

	cancel(event){
		event.preventDefault();
		event.stopPropagation();
	}

	onDragEnter(event){
		this.cancel(event);
		let enterTargetOrder = parseInt(event.target.parentElement.dataset.order);
		this.dragEnterIndex = enterTargetOrder;
		let dragTargetOrder = this.dragIndex;
		console.log('drag entering',enterTargetOrder);
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);

		if(this.droplineIndex!==undefined){
			console.log('deleting dropline');
			tempCurrentPlaylist.songs.splice(this.droplineIndex,1);
		}

		if(dragTargetOrder<enterTargetOrder){
			console.log('creating new line');
			tempCurrentPlaylist.songs.splice(enterTargetOrder+1,0,"dropline")
			this.droplineIndex = enterTargetOrder+1;
		}else if(dragTargetOrder>enterTargetOrder){
			console.log('creating new line');
			tempCurrentPlaylist.songs.splice(enterTargetOrder,0,"dropline");
			this.droplineIndex = enterTargetOrder;
		}else{
			this.droplineIndex = undefined;
		}
		this.setState({currentPlaylist: tempCurrentPlaylist});
	}

	onDragOver(event){
		this.cancel(event);
	}

	onDrop(event){
		this.swapstatus = false;
		console.log('drop happening',event.target.parentElement.dataset.order,event.dataTransfer.getData('Text'));
		let dropTargetOrder = parseInt(event.target.parentElement.dataset.order);
		let dragTargetOrder = parseInt(event.dataTransfer.getData('text'));
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);

		if(this.droplineIndex!==undefined) {
			tempCurrentPlaylist.songs.splice(this.droplineIndex,1);
			this.droplineIndex = undefined;
		}

		tempCurrentPlaylist = rearrageOrder(tempCurrentPlaylist, dragTargetOrder, dropTargetOrder);
		this.droplineIndex = undefined;
		this.setState({currentPlaylist: tempCurrentPlaylist});
	}

	onDragLeave(event){
		console.log('leaving happening',event.target.parentElement.dataset.order);
		this.lastLeavePosition = parseInt(event.target.parentElement.dataset.order);
		this.swapstatus = true;
	}

	onDragEnd(event){
		console.log('dragging is done',this.dragIndex,'lastEnterPosition',this.dragEnterIndex);
		if(!this.swapstatus) return;
		let dragTargetOrder = this.dragIndex //parseInt(event.target.dataset.order);
		let tempCurrentPlaylist = Object.assign({}, this.state.currentPlaylist);
		if(this.droplineIndex!==undefined) {
			console.log('deleting new line');
			tempCurrentPlaylist.songs.splice(this.droplineIndex,1);
			this.droplineIndex = undefined;
		}
		tempCurrentPlaylist = rearrageOrder(tempCurrentPlaylist, dragTargetOrder, this.dragEnterIndex);
		this.dragEnterIndex = undefined;
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