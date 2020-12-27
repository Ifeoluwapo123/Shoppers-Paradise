const express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	cors = require('cors'),
	path = require("path"),
	port = process.env.PORT || 3001,
	mysql = require('mysql'),
//routers
	products = require('./routes/products').router,
	users = require('./routes/users').router,
	orders = require('./routes/orders').router,
	db_config = require('./database/connection');
var connection;
//end

//middlewares 
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.json());
app.use(cors());
//end

app.use('/api/products', products);
app.use('/api/product', orders);
app.use('/api', users);

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

app.get('/', (req, res)=>{
	res.send('testing api');
});

app.listen(port, (err)=>{
	if(err) console.log('error connection');
	else console.log(`subscriber connected to ${port}`);
});
