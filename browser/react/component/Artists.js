'use strict';
import React, { Component, PropTypes } from 'react';

const Artists = ({ artists, goToArtist }) => {
	return (
		<div>
		  <h3>Artists</h3>
		    <div className="list-group">
		    {
		      this.artists.map(artist => {
		        return (
		          <div className="list-group-item" key={artist.id}>
		            <a href="#" onClick={goToArtist}>{ artist.name }</a>   
		          </div>
		        );    
		      });
		    }
		  </div>
		</div>		
	)
}

Artists.propTypes = {
	artists: PropTypes.object.isRequired
}

export default Artists 