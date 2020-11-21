const sql = require('../database/connection').connection;

var OrderModel= function(){};

OrderModel.makeOrders = function(data, callback){
    sql.query('SELECT * FROM orders WHERE user_id = ? AND product_id = ?',data, (err, rows, fields)=>{
        if(err) throw err;
        else return callback(rows);
    });
}

OrderModel.fetchTotalNumberOfOrders = function(response, callback){
    sql.query('SELECT user_id, orders FROM orders', (err, rows, fields)=>{
		if(err) response.send([]);
		else return callback(rows);
	});
}

OrderModel.fetchMyOrders = function(response, callback){
    const query = `SELECT products.productname as productname, products.price as price, products.quantity as quantity, 
	               orders.orders as orders, orders.user_id as user_id, orders.product_id as product_id 
                   FROM products JOIN orders ON products.id = orders.product_id`;

    sql.query(query, (err, rows, fields)=>{
		if(err) response.send([]);
		else return callback(rows);
	});
}

OrderModel.delete = function(data, callback){
    sql.query('DELETE FROM orders WHERE user_id = ? AND product_id = ?',data, (err, rows, fields)=>{
		if(err) throw err;
		else return callback(rows);
	});
}

OrderModel.update = function(data, callback){
    sql.query('UPDATE orders SET orders = ? WHERE user_id = ? AND product_id = ?', data,(err, rows, fields)=>{
        if(err) throw err;
        else callback(true);
    });
}

OrderModel.insert = function(data, callback){
    sql.query('INSERT INTO orders SET ?',data,(err, rows, fields)=>{
        if(err) throw err;
        else callback(true);
    });
}

module.exports = OrderModel;