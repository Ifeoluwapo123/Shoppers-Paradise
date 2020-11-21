const mysql = require('mysql');
const config = require('../config').database;

const {localhost, user, password, database} = config.production;

const connection = mysql.createConnection({
	host: localhost,
	user: user,
	password: password,
	database: database
});

module.exports = {connection: connection};

