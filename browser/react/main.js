'use strict';
import React, {Component} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {message: 'React magic begin'};
	}

	render () {
		return (
			<div id="main" className="container-fluid">
				<Sidebar />
				<h1 className="col-xs-6">{this.state.message}</h1>
				<Footer />
			</div>
		)
	}
}