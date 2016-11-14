'use strict';
import React, { Component, PropTypes } from 'react';

const ComboBox = ({selectValue, onChange, data}) => {
	return (
		<div>
			<input className="form-control" type='text' list='songName' value={selectValue} list='songName' onChange={onChange} />
			<datalist id='songName'>
				{data.map(element => <option key={element.name} value={element.name}>{element.name}</option>)}
			</datalist>
		</div>
	)
}

ComboBox.propTypes = {
	selectValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired
}

export default ComboBox;