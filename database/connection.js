const config = require('../config').database,
mysql = require('mysql');

const {localhost, user, password, database} = config.production;

const db_config = {
	host: localhost,
	user: user,
	password: password,
	database: database,
}

//mysql connection
handleDisconnect = () => {
	connection = mysql.createConnection(db_config);

	connection.connect((err)=>{
		if(err){
			console.log('error when connecting to the db');
			setTimeout(handleDisconnect, 2000);
		}else console.log('connected to the database');
	})

	connection.on('error', (err)=>{
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') handleDisconnect();
		else throw err;
	})
}

handleDisconnect();
//end

module.exports = {connection: connection};
