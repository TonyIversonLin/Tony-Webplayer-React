'use strict';
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

const Sidebar = ({ playlists }) => {
  let showPlaylists;
  if(playlists) {
      showPlaylists = playlists.map(playlist => {
      return ( 
        <p className="playlist-item" key={playlist.id}>
        <Link activeStyle={{ color: 'Aqua' }} 
          to={"/Playlists/"+playlist.id} >
          {playlist.name}
        </Link>
        </p>
      )
    })
  }
	return (
    <div className="col-xs-2">
      <sidebar>
        <img src="/juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <Link to="/Albums" activeStyle={{ color: 'Aqua' }}>ALBUMS</Link><p></p>
            <Link to="/Artists" activeStyle={{ color: 'Aqua' }}>ARTISTS</Link>
          </h4>
          <h5 className="playlist-item">
            <Link to="/addPlayList" activeStyle={{ color: 'Aqua' }}>
              <button className="btn btn-primary"> + PLAYLIST</button>
            </Link>
          </h5>
          {showPlaylists}
        </section>
      </sidebar>
    </div>
	)
}

export default Sidebar;