'use strict';
import React, {Component, PropTypes} from 'react'; 

const Albums = ({albums, loadAlbums}) => {
	const albumList = albums.map((album, index) => {
		return <div className="col-xs-4" key={album.id}>
      <a className="thumbnail" href="#">
        <img src={album.imageUrl} />
        <div className="caption">
          <h5>
            <span>{album.name}</span>
          </h5>
          <small>{album.songs.length}</small>
        </div>
      </a>
    </div>		
	});

	return (
		<div>
		  <h3>Albums</h3>
		  <div className="row">
		  	{albumList}
		  </div>
		</div>		
	)
}

Albums.propTypes = {
	albums: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		songs: PropTypes.array.isRequired
	}).isRequired).isRequired
}

export default Albums;