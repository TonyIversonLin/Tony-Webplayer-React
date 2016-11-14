'use strict';
import * as types from './actionType';

export function errorFromServer(message) {
	return {
		type: types.SERVER_ERROR,
		error: message
	}
}

export function resetError() {
	return {
		type: types.RESET_ERROR
	}
}