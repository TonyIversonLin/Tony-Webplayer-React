'use strict';
import React, {Component, PropTypes} from 'react'; 
import { Link } from 'react-router';

const Albums = ({albums, fetchSingleAlbum}) => {
	const albumList = albums.map((album, index) => {
		return <div className="col-xs-4" key={album.id}>
      <Link className="thumbnail" to={'/albums/'+album.id}>
        <img src={album.imageUrl} />
        <div className="caption">
          <h5>
            <span>{album.name}</span>
          </h5>
          <small>{album.songs.length}</small>
        </div>
      </Link>
    </div>		
	});

      //<Link className="thumbnail" to={'/albums/'+album.id}>
      //onClick={() => fetchSingleAlbum(album.id)}
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
	}).isRequired).isRequired,
	fetchSingleAlbum: PropTypes.func.isRequired
}

export default Albums;