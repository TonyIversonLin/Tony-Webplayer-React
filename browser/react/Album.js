'use strict';
import React, {Component, PropTypes} from 'react';

const Album = ({name, imageUrl, songs}) => {
		let songRow = songs.map((song,index) => {
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
		<div className="album col-xs-10">
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
		    <tbody>
		    	{songRow}
		    </tbody>
		  </table>
		</div>
	)
}

Album.propTypes = {
	name: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	songs: PropTypes.array.isRequired,
}
export default Album;
