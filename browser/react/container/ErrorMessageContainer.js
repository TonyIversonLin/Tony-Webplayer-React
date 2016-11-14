'use strict';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import ErrorMessage from '../component/ErrorMessage';

const mapStateToProps = (state, ownProps) => {
	return {
		error: state.error
	}
}

export default connect(mapStateToProps)(ErrorMessage);