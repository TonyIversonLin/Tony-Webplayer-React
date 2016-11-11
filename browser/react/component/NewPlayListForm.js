'use strict';
import React, { Component, PropTypes } from 'react';

const NewPlayListForm = ({name, onChange, invalid, errorMessage}) => {
	return (
		<div className="well">
		  <form className="form-horizontal">
		    <fieldset>
		      <legend>New Playlist</legend>
		      <div className="form-group">
		        <label className="col-xs-2 control-label">Name</label>
		        <div className="col-xs-10">
		          <input className="form-control" type="text" value={name} onChange={onChange}/>
		        </div>
		      </div>
		      <div className="form-group">
		        <div className="col-xs-10 col-xs-offset-2">
		          <button type="submit" className="btn btn-success" disabled={invalid}>Create Playlist</button>
		        </div>
		      </div>
		      {errorMessage && <div className="alert alert-warning">Please enter a name</div>}
		    </fieldset>
		  </form>
		</div>
	)
}

NewPlayListForm.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	invalid: PropTypes.bool.isRequired,
	errorMessage: PropTypes.bool.isRequired
}

export default NewPlayListForm;