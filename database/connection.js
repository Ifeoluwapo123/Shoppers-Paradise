const config = require('../config').database;

const {localhost, user, password, database} = config.production;

const db_config = {
	host: localhost,
	user: user,
	password: password,
	database: database,
}

module.exports = db_config;
