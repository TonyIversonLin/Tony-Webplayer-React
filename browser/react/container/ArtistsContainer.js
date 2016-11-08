'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Artists from '../component/Artists';

class ArtistsContainer extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.props.loadArtists();
	}	

	render () {
		return <Artists artist={this.props.artists} />
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		artists: state.artists
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loadArtists: () => dispatch(fetchArtists()),
		fetchSingleArtist: (artistID) => dispatch(fetchSingleArtist(artistID))
	}
}

export default connect(mapStateToProps)(ArtistsContainer);