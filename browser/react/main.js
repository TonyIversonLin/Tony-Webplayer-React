'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Album from './Album';

const audio = document.createElement('audio');

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
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
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
			if(this.state.playStatus === true) {
				audio.pause();this.setState({playStatus: false});
			}else {
				audio.play(); this.setState({playStatus: true});
			}
		}else{
			audio.pause();
			audio.src = song.url;
			audio.load();
			audio.play();
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

	next () {
		let songs = this.state.album.songs;
		let currentSong = this.state.currentSong
		let currentIndex = songs.indexOf(currentSong)
		let max = songs.length;
		if(currentIndex<max-1) currentIndex++;
		else currentIndex = 0;
		audio.pause();
		audio.src = songs[currentIndex].url;
		audio.load();
		audio.play();
		this.setState({
				currentSong: songs[currentIndex],
				playStatus: true
		});
	}

	previous () {
		let songs = this.state.album.songs;
		let currentSong = this.state.currentSong
		let currentIndex = songs.indexOf(currentSong)
		let max = songs.length;
		if(currentIndex>0) currentIndex--;
		else currentIndex = songs.length-1;
		audio.pause();
		audio.src = songs[currentIndex].url;
		audio.load();
		audio.play();
		this.setState({
				currentSong: songs[currentIndex],
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
					next={this.next}
					previous={this.previous}
					progress={this.state.progress}
				/>
			</div>
		)
	}
}