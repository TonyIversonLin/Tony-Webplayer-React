'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import Albums from './Albums';
import SongTable from './SongTable';

const Artist = ({artist, albums, currentSong, playSong, children}) => {
	let songs = [];
	albums.forEach(album => songs = songs.concat(album.songs));
	let childrenWithProps;
	if(children) {
		console.log('..........', children.type.name)
		if(children.type.name==="Albums"){
			childrenWithProps = React.cloneElement(children, {albums});
		}else childrenWithProps= React.cloneElement(children, {currentSong, playSong, songs});
	}
	return (
		<div>
			<h3>{artist.name}</h3>
			<ul className='nav nav-tabs'>
				<li><Link to={`/Artists/${artist.id}/albums`} activeStyle={{ color: 'Aqua' }}>ALBUMS</Link></li>
				<li><Link to={`/Artists/${artist.id}/songs`} activeStyle={{ color: 'Aqua' }}>SONGS</Link></li>
			</ul>
			{childrenWithProps}
		</div>
	)
}

Artist.propTypes ={
	artist: PropTypes.object.isRequired,
	albums: PropTypes.array.isRequired,
	currentSong: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired
}

export default Artist;