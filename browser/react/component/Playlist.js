'use strict';
import React, {Component, PropTypes} from 'react';
import SongTable from '../component/SongTable';

const Playlist = ({currentPlaylist, currentSong, playSong}) => {
	return (
		<div>
			<h3>{currentPlaylist.name}</h3>
			<SongTable songs={currentPlaylist.songs} currentSong={currentSong} playSong={playSong}/>
			{!currentPlaylist.songs.length && <small>No songs.</small>}
			<hr/>
		</div>
	)
}

Playlist.propTypes = {
	currentPlaylist: PropTypes.object.isRequired,
	currentSong: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired
}

export default Playlist