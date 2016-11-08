'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Albums from '../component/Albums';
import {fetchAlbumsFromServer, fetchSingleAlbum} from '../action/albumActions'

class AlbumsContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadAlbums();
	}	

	render () {
		return <Albums 
						albums={this.props.albums} 
						fetchSingleAlbum={this.props.fetchSingleAlbum} />
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		albums: state.albums
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loadAlbums: () => dispatch(fetchAlbumsFromServer()),
		fetchSingleAlbum: (album) => dispatch(fetchSingleAlbum(album))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);



