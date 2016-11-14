'use strict';
import React, { Component, PropTypes } from 'react';
import ErrorMessageContainer from '../container/ErrorMessageContainer';

const AddSongForm = ({selectedSong, onChange, allSongs, invalid, submit}) => {
	return (
		<div className="well">
			<form className="form-horizontal"  onSubmit={submit}>

				<fieldset>
					<legend>Add to Playlist</legend>

					<div className="form-group">
						<label className="col-xs-2 control-label">Song</label>
		        <div className="col-xs-7">
		          <select className="form-control" value={selectedSong} onChange={onChange}>
		          	<option value="">{}</option>
		          	{allSongs.map(song => <option key={song.id} value={song.id}>{song.name}</option>)}
		          </select>
		        </div>
		        <div className="col-xs-2">
		          <button type="submit" className="btn btn-success" disabled={invalid}>Add Song</button>
		        </div>						
					</div>

		      <ErrorMessageContainer/>

				</fieldset>
			</form>
		</div>
	)
}

AddSongForm.propTypes = {
	selectedSong: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired,
	allSongs: PropTypes.array.isRequired,
	invalid: PropTypes.bool.isRequired,
	submit: PropTypes.func.isRequired
}

export default AddSongForm;
