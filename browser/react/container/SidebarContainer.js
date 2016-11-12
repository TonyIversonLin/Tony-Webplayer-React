'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Sidebar from '../component/Sidebar';

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Sidebar); 