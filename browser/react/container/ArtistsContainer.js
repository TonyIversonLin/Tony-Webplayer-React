'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Artists from '../component/Artists';
import {nameCheck} from '../Utility';

// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		artists: state.artists
// 	}
// }

// export default connect(mapStateToProps)(Artists);

class ArtistsContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			artists: [...this.props.artists],
			name: ''
		}
		this.filter = this.filter.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({artists: nextProps.artists})
	}

	filter(event) {
		let targetName = event.target.value;
		let filterArtist = nameCheck(targetName, this.props.artists);
		this.setState({artists: filterArtist});
		this.setState({name: targetName});
	}

	render() {
		console.log('artists', this.state.artists);
		return (
			<div>
				<h3>Artists</h3>
				<input type='text' 
					placeholder='Search Artist' 
					value={this.state.name} 
					onChange={this.filter}/>
				<Artists artists={this.state.artists}/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		artists: state.artists
	}
}

export default  connect(mapStateToProps)(ArtistsContainer);