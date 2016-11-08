'use strict';
import React, {Component, PropTypes} from 'react';

const Album = ({album, playSong, currentSong}) => {
		const {songs, imageUrl, name} = album;
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
		</tr>
		})
	return (
		<div>
		  <div className="col-xs-7">
		    <h3>{name}</h3>
		    <img src={imageUrl} className="img-thumbnail" />
		  </div>
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
		</div>
	)
}

Album.propTypes = {
	album: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired,
	currentSong: PropTypes.object.isRequired
}
export default Album;
