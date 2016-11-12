'use strict';
import React, { Component, PropTypes } from 'react';

const AddSongForm = ({selectedSong, onChange, allSongs, invalid}) => {
	return (
		<div className="well">
			<form className="form-horizontal" >

				<fieldset>
					<legend>Add to Playlist</legend>

					<div className="form-group">
						<label className="col-xs-2 control-label">Song</label>
		        <div className="col-xs-10">
		          <select className="form-control" value={selectedSong} onChange={onChange}>
		          <option value="">{}</option>
		          {allSongs.map(song => <option key={song.id} value={song.id}>{song.name}</option>)}
		          </select>
		        </div>						
					</div>

		      <div className="form-group">
		        <div className="col-xs-10 col-xs-offset-2">
		          <button type="submit" className="btn btn-success" disabled={invalid} >Create Playlist</button>
		        </div>
		      </div>

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
}

export default AddSongForm;
