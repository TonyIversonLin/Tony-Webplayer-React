'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Album from './Album';
import {audio, playMusic, changeSong, forcePosition} from './Utility';

export default class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			album: {imageUrl: '', name: '', songs: []},
			currentSong: {},
			playStatus: false,
			progress: 0
		}
		this.playSong = this.playSong.bind(this);
		this.toggleSong = this.toggleSong.bind(this);
		this.switchSong = this.switchSong.bind(this);
		this.scrubber = this.scrubber.bind(this);
		this.keypress = this.keypress.bind(this);

		audio.addEventListener('ended', () => {
  		this.switchSong('next'); 
		});
		audio.addEventListener('timeupdate', () => {
  		this.setState({
    		progress: 100 * audio.currentTime / audio.duration
  		});
		});
		document
	}

	playSong (song) {
		if(this.state.currentSong === song) {
			this.toggleSong ();
		}else{
			playMusic(song.url);
			this.setState({
				currentSong: song,
				playStatus: true
			})
		}
	}

	toggleSong () {
		if(this.state.playStatus) {
			audio.pause(); this.setState({playStatus: false}); 
		}else {
			audio.play(); this.setState({playStatus: true});
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
		console.log('key board event')
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
		return (
			<div id="main" className="container-fluid">
				<Sidebar />
				<Album 
					album={this.state.album}
					playSong={this.playSong}
					currentSong={this.state.currentSong}
					keypress = {this.keypress}
					/>
				<Footer
					playStatus={this.state.playStatus}
					toggleSong={this.toggleSong}
					currentSong={this.state.currentSong}
					switchSong = {this.switchSong}
					progress={this.state.progress}
					scrubber={this.scrubber}
					keypress={this.keypress}
				/>
			</div>
		)
	}
}