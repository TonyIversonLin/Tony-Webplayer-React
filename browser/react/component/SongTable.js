'use strict';
import React, {Component, PropTypes} from 'react';

const SongTable = ({ songs, currentSong, playSong}) => {
	const songRow = songs.map((song,index) => {
		return <tr key={index} className={song===currentSong ? "active" : ""}>
	    <td>
	      <button className={song===currentSong ? "hide" :"btn btn-default btn-xs"} onClick={() => playSong(song, songs)}>
	        <span className="glyphicon glyphicon-play"></span>
	      </button>
	    </td>
	    <td>{song.name}</td>
	    <td>{song.artists.map((artist)=>artist.name).join(' ')}</td>
	    <td>{song.genre}</td>
	    <td>
	    	<button className="btn btn-default btn-xs">
	    		<span className="glyphicon glyphicon-remove"></span>
	    	</button>
	    </td>
		</tr>
		});

	return (
		  <table className='table'>
		    <thead>
		      <tr>
		        <th></th>
		        <th>Name</th>
		        <th>Artists</th>
		        <th>Genre</th>
		      </tr>
		    </thead>
		    <tbody>
		    	{songRow}
		    </tbody>
		  </table>
	)
}

SongTable.propTypes ={
	songs: PropTypes.array.isRequired,
	currentSong: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired
}

export default SongTable;