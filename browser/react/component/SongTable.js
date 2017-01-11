'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

const SongTable = ({ songs, currentSong, playSong, deleteSong, draggable, onDragStart, onDragEnter, onDragOver, onDrop, onDragLeave}) => {
	console.log('on drop',onDrop);
	const songRow = songs.map((song,index) => {
		return(
		<tr key={index} draggable={draggable} onDragStart={onDragStart} onDragEnter={onDragEnter} onDragOver={onDragOver}
		onDrop={onDrop} onDragLeave={onDragLeave} data-order={song.order} className={song===currentSong ? "active" : ""}>
	    <td>
	      <button className={song===currentSong ? "hide" :"btn btn-default btn-xs"} onClick={() => playSong(song, songs)}>
	        <span className="glyphicon glyphicon-play"></span>
	      </button>
	    </td>
	    <td>{song.name}</td>
	    <td>{song.artists.map(artist => {
	    	return <Link key={artist.id} to={"/Artists/"+artist.id}>{artist.name}</Link>
	    })}
	    </td>
	    <td>{song.genre}</td>
	    {deleteSong && 
		    <td>
		    	<button className="btn btn-default btn-xs" onClick={() => deleteSong(song.id)}>
		    		<span className="glyphicon glyphicon-remove"></span>
		    	</button>
		    </td>}
		</tr>)
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