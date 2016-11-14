'use strict';
import React, { Component, PropTypes } from 'react';

export default ({error}) => {
	if(error) return <div className="alert alert-warning">{error}</div> 
	else return null
}
