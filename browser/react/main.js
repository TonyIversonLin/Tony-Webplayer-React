'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Album from './Album';

const fakeAlbum = {
  name: 'Abbey Road',
  imageUrl: 'http://fillmurray.com/300/300',
  songs: [{
    id: 1,
    name: 'Romeo & Juliette',
    artists: [{name: 'Bill'}],
    genre: 'Funk',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 2,
    name: 'White Rabbit',
    artists: [{name: 'Bill'}, {name: 'Bob'}],
    genre: 'Fantasy',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 3,
    name: 'Lucy in the Sky with Diamonds',
    artists: [{name: 'Bob'}],
    genre: 'Space',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }]
};

export default class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = Object.assign({}, fakeAlbum);
	}

	render () {
		let songRow = this.state.songs.map((song,index) => {
			return <tr key={index}>
	      <td>
	        <button className="btn btn-default btn-xs">
	          <span className="glyphicon glyphicon-play"></span>
	        </button>
	      </td>
	      <td>{song.name}</td>
	      <td>{song.artists.map((artist)=>artist.name).join(' ')}</td>
	      <td>{song.genre}</td>
			</tr>
		})
		return (
			<div id="main" className="container-fluid">
				<Sidebar />
				<Album name={this.state.name} imageUrl={this.state.imageUrl} songs={this.state.songs}/>
				<Footer />
			</div>
		)
	}
}