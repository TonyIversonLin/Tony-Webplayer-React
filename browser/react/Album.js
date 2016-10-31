'use strict';
import React, {Component, PropTypes} from 'react';

const Album = ({album, playSong, currentSong, keypress}) => {
		const {songs, imageUrl, name} = album;
		const songRow = songs.map((song,index) => {
		return <tr key={index} className={song===currentSong ? "active" : ""}>
      <td onKeyDown={keypress}>
        <button className={song===currentSong ? "hide" :"btn btn-default btn-xs"} onClick={() => playSong(song)}>
          <span className="glyphicon glyphicon-play"></span>
        </button>
      </td>
      <td>{song.name}</td>
      <td>{song.artists.map((artist)=>artist.name).join(' ')}</td>
      <td>{song.genre}</td>
		</tr>
		})
	return (
		<div className="album col-xs-10" onKeyDown={keypress}>
		  <div>
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
		    <tbody onKeyDown={keypress}>
		    	{songRow}
		    </tbody>
		  </table>
		</div>
	)
}

Album.propTypes = {
	album: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired,
	keypress: PropTypes.func.isRequired,
	currentSong: PropTypes.object.isRequired
}
export default Album;
