'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const Artists = ({ artists }) => {
	return (
		<div>
		    <div className="list-group">
		    {
		      artists.map(artist => {
		        return (
		          <div className="list-group-item" key={artist.name}>
		            <Link to={"/Artists/"+artist.id}>{ artist.name }</Link>   
		          </div>
		        )    
		      })
		    }
		  </div>
		</div>		
	)
}

Artists.propTypes = {
	artists: PropTypes.array.isRequired
}

export default Artists; 