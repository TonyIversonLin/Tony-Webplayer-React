'use strict';
import React, {Component} from 'react';

export default class Sidebar extends Component {

	render () {
		return (
      <div className="col-xs-2">
        <sidebar>
          <img src="juke.svg" className="logo" />
          <section>
            <h4 className="menu-item active">
              <a href="#">ALBUMS</a>
            </h4>
            <h5 className="playlist-item">
               <a onClick={viewAllArtists} href="#">ARTISTS</a>
            </h5>
          </section>
        </sidebar>
      </div>
		)
	}
}