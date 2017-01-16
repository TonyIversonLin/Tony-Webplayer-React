'use strict'

const db = require('../db');
const Sequelize = db.Sequelize;

module.exports = db.define('playlistSongOrder',{
	order: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	lastIndex: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})