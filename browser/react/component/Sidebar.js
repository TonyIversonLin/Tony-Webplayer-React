'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

const Sidebar = ({ viewAllAlbums, viewAllArtists}) => {
	return (
    <div className="col-xs-2">
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <Link to="/Albums">ALBUMS</Link>
          </h4>
          <h5 className="playlist-item">
             <Link to="/Artists">ARTISTS</Link>
          </h5>
        </section>
      </sidebar>
    </div>
	)
}

Sidebar.propTypes = {
  viewAllArtists: PropTypes.func.isRequired,
  viewAllAlbums: PropTypes.func.isRequired
}

export default Sidebar;