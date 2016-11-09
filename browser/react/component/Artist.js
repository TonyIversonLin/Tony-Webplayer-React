'use strict';
import React, {Component, PropTypes} from 'react';
import Albums from './Albums';
import SongTable from './SongTable';

const Artist = ({artist, albums, currentSong, playSong}) => {
	let songs = [];
	albums.forEach(album => songs = songs.concat(album.songs))
	return (
		<div>
			<h3>{artist.name}</h3>
			<Albums albums={albums}/>
			<SongTable currentSong={currentSong} playSong={playSong} songs={songs}/>
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