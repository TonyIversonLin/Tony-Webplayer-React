'use strict';
import React, {Component, PropTypes} from 'react';
import SongTable from './SongTable'

const Album = ({album, playSong, currentSong}) => {
	const {songs, imageUrl, name} = album;
	return (
		<div>
		  <div className="col-xs-12 col-sm-6 col-md-4">
		    <h3>{name}</h3>
		    <img src={imageUrl} className="img-thumbnail" />
		  </div>
		  <SongTable songs={songs} playSong={playSong} currentSong={currentSong}/>
		</div>
	)
}

Album.propTypes = {
	album: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired,
	currentSong: PropTypes.object.isRequired
}
export default Album;
