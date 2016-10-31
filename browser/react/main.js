'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Album from './Album';
import {audio, playMusic, changeSong} from './Utility';

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

		audio.addEventListener('ended', () => {
  		this.next(); 
		});
		audio.addEventListener('timeupdate', () => {
  		this.setState({
    		progress: 100 * audio.currentTime / audio.duration
  		});
		});
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
					/>
				<Footer 
					playStatus={this.state.playStatus}
					toggleSong={this.toggleSong}
					currentSong={this.state.currentSong}
					switchSong = {this.switchSong}
					progress={this.state.progress}
				/>
			</div>
		)
	}
}