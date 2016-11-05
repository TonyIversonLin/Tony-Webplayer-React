'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Albums from '../component/Albums';
import {receiveAlbums} from '../action/albumActions'

class AlbumsContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		fetch('api/albums')
			.then(res => res.json())
			.then(albumsFromServer => {
				let albumsList = albumsFromServer.map(album => {
					album.imageUrl = `/api/albums/${album.id}/image`;
					return album;
				})
				this.props.loadAlbums(albumsList);
			}).catch(error => console.log(error));
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
		loadAlbums: function (albums) {
			dispatch(receiveAlbums(albums)); 
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);



