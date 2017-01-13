'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

const SongTable = ({ songs, currentSong, playSong, deleteSong, draggable, onDragStart, onDragEnter, onDragOver, onDrop, onDragLeave, onDragEnd, dropline}) => {
	const songRow = songs.map((song,index) => {
		if(song==="dropline"){
			return <tr key={'dropline'} style={{ outline: "aqua dashed thin"}}>

								<th colSpan='5' style={{textAlign: 'center', background: 'repeating-linear-gradient(45deg,#2e3338,#2e3338 10px,#62686d 10px,#62686d 20px)'}}>
									<strong style={{color: 'aqua'}}>{'\u2193'} Move Song Here</strong>
								</th>
		
							</tr>
		}
		return(	
		<tr style={{borderColor: 'aqua'}} key={index} draggable={draggable} onDragStart={onDragStart} onDragEnter={onDragEnter} onDragOver={onDragOver}
		onDrop={onDrop} onDragLeave={onDragLeave} onDragEnd={onDragEnd} data-order={song.order} className={song===currentSong ? "active" : ""}>
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
		  <table className='table' style={{borderCollapse: 'collapse'}}>
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