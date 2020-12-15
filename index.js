const express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	cors = require('cors'),
	path = require("path"),
	port = process.env.PORT || 3001,
//router and mysql connection
	products = require('./routes/products').router,
	users = require('./routes/users').router,
	orders = require('./routes/orders').router,
	connection = require('./database/connection').connection;
//end
    

//middlewares 
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.json());
//enabling cors
app.use(cors());
app.use('/api/products', products);
app.use('/api/product', orders);
app.use('/api', users);

app.get('/', (req, res)=>{
	res.send('testing api');
});

connection.connect((err)=>{
	if(err) console.log('error connecting');
	else console.log('connected');
});


app.listen(port, (err, success)=>{
	if(err) console.log('error connection');
	else console.log(`subscriber connected to ${port}`);
});
