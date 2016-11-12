import { Route, IndexRoute, IndexRedirect} from 'react-router';
import React, {PropTypes} from 'react';
import AlbumsContainer from './container/AlbumsContainer';
import AlbumContainer from './container/AlbumContainer';
import ArtistsContainer from './container/ArtistsContainer';
import ArtistContainer from './container/ArtistContainer';
import Main from './container/Main';
import Albums from './component/Albums';
import SongTable from './component/SongTable';
import NotFound from './component/NotFound';
import NewPlayListContainer from './container/NewPlayListContainer';
import PlaylistContainer from './container/PlaylistContainer';

import {fetchAlbumsFromServer, fetchSingleAlbum} from './action/albumActions';
import {fetchArtists, fetchSingleArtist} from './action/artistActions';
import { fetchAllPlaylists, fetchSinglePlaylist } from './action/playlistActions';

export default (store) => {
	return (
		<Route path='/' component={Main} onEnter={preLoadAllPlaylists(store)}>
			<IndexRoute component={AlbumsContainer} onEnter={preLoadAllAlbum(store)}/>
			<Route path='Albums' component={AlbumsContainer} onEnter={preLoadAllAlbum(store)}/>
			<Route path='Albums/(:id)' component={AlbumContainer} onEnter={preLoadSingleAlbum(store)}/>
			<Route path='Artists' component={ArtistsContainer} onEnter={preLoadAllArtists(store)}/>
			<Route path='Artists/(:id)' component={ArtistContainer} onEnter={preLoadSingleArtist(store)}>
				<IndexRoute component={Albums}/>
				<Route path='albums' component={Albums}/>
				<Route path='songs' component={SongTable}/>
			</Route>
			<Route path='addPlayList' component={NewPlayListContainer}/>
			<Route path='Playlists/(:id)' component={PlaylistContainer} onEnter={preLoadSinglePlaylist(store)}/>
			<Route path='*' component={NotFound}/>
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

function preLoadAllPlaylists(store) {
	return () => store.dispatch(fetchAllPlaylists());
}

function preLoadSinglePlaylist(store) {
	return nextState => {
		let playlistID = nextState.params.id;
		store.dispatch(fetchSinglePlaylist(playlistID));
	}
}
