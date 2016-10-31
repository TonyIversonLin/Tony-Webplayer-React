'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Album from './Album';

export default class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			album: {imageUrl: '', name: '', songs: []}
		}
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
				<Album name={this.state.album.name} imageUrl={this.state.album.imageUrl} songs={this.state.album.songs}/>
				<Footer />
			</div>
		)
	}
}