'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Albums from '../component/Albums';
import {fetchAlbumsFromServer} from '../action/albumActions'

class AlbumsContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadAlbums();
	}	

	render () {
		return <Albums albums={this.props.albums} />
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		albums: state.albums
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loadAlbums: function () {
			dispatch(fetchAlbumsFromServer()); 
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);



