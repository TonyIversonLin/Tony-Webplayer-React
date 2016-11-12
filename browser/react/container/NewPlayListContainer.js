'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import NewPlayListForm from '../Component/NewPlayListForm';
import { createNewPlayList } from '../action/playlistActions';

class NewPlayListContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			invalid: true,
			errorMessage: false
		}
		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
	}

	update(event) {
		let playlistName = event.target.value;
		let validStatus = (playlistName.length>0) ? false : true
		this.setState({name: playlistName, invalid: validStatus, errorMessage: validStatus})
	}

	submit(event) {
		event.preventDefault();
		this.props.addNewPlaylist(this.state.name)
			.then(newPlaylist => browserHistory.push(`/Playlists/${newPlaylist.id}`));
		this.setState({name: '', invalid: true, errorMessage: false})
	} 

	render() {
		return <NewPlayListForm 
						onChange={this.update} 
						name={this.state.name}
						invalid={this.state.invalid}
						errorMessage={this.state.errorMessage}
						submit={this.submit}/>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addNewPlaylist: (playlist) => dispatch(createNewPlayList(playlist))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayListContainer)