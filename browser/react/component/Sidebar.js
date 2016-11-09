'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

const Sidebar = () => {
	return (
    <div className="col-xs-2">
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <Link to="/Albums" activeStyle={{ color: 'Aqua' }}>ALBUMS</Link>
          </h4>
          <h5 className="playlist-item">
             <Link to="/Artists" activeStyle={{ color: 'Aqua' }}>ARTISTS</Link>
          </h5>
        </section>
      </sidebar>
    </div>
	)
}

export default Sidebar;