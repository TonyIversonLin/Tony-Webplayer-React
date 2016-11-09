import { Route, IndexRoute } from 'react-router';
import React, {PropTypes} from 'react';
import AlbumsContainer from './container/AlbumsContainer';
import AlbumContainer from './container/AlbumContainer';
import ArtistsContainer from './container/ArtistsContainer';
import ArtistContainer from './container/ArtistContainer';
import Main from './container/Main';

import {fetchAlbumsFromServer, fetchSingleAlbum} from './action/albumActions';
import {fetchArtists, fetchSingleArtist} from './action/artistActions'

export default (store) => {
	return (
		<Route path='/' component={Main}>
			<Route path='Albums' component={AlbumsContainer} onEnter={preLoadAllAlbum(store)}/>
			<Route path='Albums/(:id)' component={AlbumContainer} onEnter={preLoadSingleAlbum(store)}/>
			<Route path='Artists' component={ArtistsContainer} onEnter={preLoadAllArtists(store)}/>
			<Route path='Artists/(:id)' component={ArtistContainer} onEnter={preLoadSingleArtist(store)}/>
		</Route>
	)
}

function preLoadAllAlbum(store) {
	return () => store.dispatch(fetchAlbumsFromServer())
}

function preLoadSingleAlbum(store) {
	return nextState => {
		let albumID = nextState.params.id;
		store.dispatch(fetchSingleAlbum(albumID));
	}
}

function preLoadAllArtists(store) {
	return () => store.dispatch(fetchArtists())
}

function preLoadSingleArtist(store) {
	return nextState => {
		let artistID = nextState.params.id;
		store.dispatch(fetchSingleArtist(artistID));
	}
}

