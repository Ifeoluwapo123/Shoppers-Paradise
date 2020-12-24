const mysql = require('mysql');
const config = require('../config').database;

const {localhost, user, password, database} = config.development;

const connection = mysql.createPool({
	host: localhost,
	user: user,
	password: password,
	database: database,
	connectionLimit: 10,
	queueLimit: 30,
	acquireTimeout: 1000000,
	queryTimeout: 6000
});

module.exports = {connection: connection};
