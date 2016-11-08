'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar';
import Album from '../component/Album';
import AlbumsContainer from './AlbumsContainer';
import {AUDIO, playMusic, changeSong, forcePosition} from '../Utility';
import { toggle, toggleOne, switchSong } from '../action/albumActions'

class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			album: {imageUrl: '', name: '', songs: []},
			currentSong: {},
			playStatus: false,
			progress: 0
		}
		// this.playSong = this.playSong.bind(this);
		// this.toggleSong = this.toggleSong.bind(this);
		this.switchSong = this.switchSong.bind(this);
		this.scrubber = this.scrubber.bind(this);
		this.keypress = this.keypress.bind(this);

		AUDIO.addEventListener('ended', () => {
  		this.switchSong('next'); 
		});
		AUDIO.addEventListener('timeupdate', () => {
  		this.setState({
    		progress: 100 * AUDIO.currentTime / AUDIO.duration
  		});
		});
	}

	// playSong (song) {
	// 	if(this.state.currentSong === song) {
	// 		this.toggleSong ();
	// 	}else{
	// 		playMusic(song.url);
	// 		this.setState({
	// 			currentSong: song,
	// 			playStatus: true
	// 		})
	// 	}
	// }

	toggleSong () {
		if(this.state.playStatus) {
			AUDIO.pause(); this.setState({playStatus: false}); 
		}else {
			AUDIO.play(); this.setState({playStatus: true});
		}
	}

	switchSong (type) {
		let nextSong = changeSong(type, this.state.album.songs, this.state.currentSong);
		this.setState({
				currentSong: nextSong,
				playStatus: true
		});		
	}

	scrubber (e) {
		let width = e.nativeEvent.target.scrollWidth;
		let clickPosition = e.nativeEvent.offsetX;
		forcePosition(width, clickPosition);
	}

	keypress (e) {
		if(e.keyCode===39) this.switchSong('next');
		if(e.keyCode===37) this.switchSong('previous');
	}

	componentDidMount() {
		const toJson = response => response.json();
		const log = console.log.bind(console);
		const logError = console.error.bind(console);
		fetch('api/albums/1')
			.then(res => {
				return res.json();
			}).then(albumFromServer => {
				albumFromServer.imageUrl = `/api/albums/${albumFromServer.id}/image`
				this.setState({album: albumFromServer})
			})
	}

	render () {
		let album;
		if(this.props.currentAlbum.id) {
			album = <Album 
					album={this.props.currentAlbum}
					playSong={this.props.toggleOne}
					currentSong={this.props.currentSong}
					/>
		}

		return (
			<div id="main" className="container-fluid">
			<div className="col-xs-2">
				<Sidebar />
			</div>
			<div className="col-xs-10">
				<AlbumsContainer/>
				{album}
			</div>
				<Footer
					playStatus={this.props.isPlaying}
					toggle={this.props.toggle}
					currentSong={this.props.currentSong}
					switchSong = {this.props.switchSong}
					progress={this.state.progress}
					scrubber={this.scrubber}
					keypress={this.keypress}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let { currentAlbum, currentSong, currentSongList, isPlaying} = state
	return {
		currentAlbum,
		currentSong,
		currentSongList,
		isPlaying
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggle: () => dispatch(toggle()),
		toggleOne: (song, songList) => dispatch(toggleOne(song, songList)),
		switchSong: (type) => dispatch(switchSong(type))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
