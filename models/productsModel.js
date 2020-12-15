const sql = require('../database/connection').connection;

var ProductModel= function(){};

ProductModel.productsNotByUser = function(id, response, callback){
	const query = `SELECT products.id as id, products.user_id as user_id, products.productname as productname, products.type as type, products.price as price, products.quantity as quantity, 
					products.image_name as image_name, users.name as name, users.phone as phone FROM products JOIN users ON products.user_id = users.id`;
    sql.query(query, (err, rows, fields)=>{
		if(err) response.send([]);
		else return callback(rows);
	});
}

ProductModel.productsByUsers = function(id, response, callback){
    sql.query('SELECT * FROM products', (err, rows, fields)=>{
		if(err) response.send([]); 
	    else return callback(rows);
	});
}

ProductModel.delete = function(id, callback){
    sql.query('DELETE FROM products WHERE id = ?',id, (err, rows, fields)=>{
		if(err) throw err;
		else return callback(rows);
	});
}

ProductModel.update = function(data, callback){
	sql.query('UPDATE products SET type = ?, price = ?, image_name = ?, quantity = ?, productname = ? WHERE id = ?', data,
	(err, rows, fields)=>{
		if(err) throw err;
		else return callback(true);
	});
}

module.exports = ProductModel;