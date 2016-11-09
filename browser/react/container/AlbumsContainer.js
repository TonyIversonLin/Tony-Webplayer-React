'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Albums from '../component/Albums';

const mapStateToProps = (state, ownProps) => {
	return {
		albums: state.albums
	}
}

export default connect(mapStateToProps)(Albums);



