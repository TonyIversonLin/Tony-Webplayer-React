import { Route, IndexRoute } from 'react-router';
import React, {PropTypes} from 'react';
import AlbumsContainer from './container/AlbumsContainer';
import AlbumContainer from './container/AlbumContainer';
import ArtistsContainer from './container/ArtistsContainer';
import ArtistContainer from './container/ArtistContainer';
import Main from './container/Main';

import {fetchAlbumsFromServer, fetchSingleAlbum} from './action/albumActions'

export default (store) => {
	return (
		<Route path='/' component={Main}>
			<Route path='Albums' component={AlbumsContainer} />
			<Route path='Albums/:id' component={AlbumContainer} onEnter={preLoadSingleAlbum(store)}/>
			<Route path='Artists' component={ArtistsContainer} />
			<Route path='Artists/:id' component={ArtistContainer} />
		</Route>
	)
}

function preLoadSingleAlbum(store) {
	return nextState => {
		let albumID = nextState.params.id;
		console.log('store.............',store)
		store.dispatch(fetchSingleAlbum(albumID));
	}
}