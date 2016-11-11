'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import NewPlayListForm from '../Component/NewPlayListForm';

class NewPlayListContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			invalid: true,
			errorMessage: false
		}
		this.update = this.update.bind(this);
	}

	update(event) {
		let playlistName = event.target.value;
		let validStatus = (playlistName.length>0) ? false : true
		this.setState({name: playlistName, invalid: validStatus, errorMessage: validStatus})
	} 

	render() {
		return <NewPlayListForm 
						onChange={this.update} 
						name={this.state.name}
						invalid={this.state.invalid}
						errorMessage={this.state.errorMessage}/>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayListContainer)