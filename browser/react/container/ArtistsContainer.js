'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Artists from '../component/Artists';

const mapStateToProps = (state, ownProps) => {
	return {
		artists: state.artists
	}
}

export default connect(mapStateToProps)(Artists);