'use strict';
import React, {Component, PropTypes} from 'react';
import Albums from './Albums';

const Artist = ({name, albums, songs}) => {

	return (
		<div>
			<h3>{name}</h3>
			<h4>ALBUMS</h4>
			<Album albums={albums}/>
			<h4>SONGS</h4>

		</div>
	)
}