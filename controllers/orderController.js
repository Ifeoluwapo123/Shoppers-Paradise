const Order = require('../models/orderModel');

const OrderController =  function(){};

OrderController.makeOrders = function(req, res){
    const product_id = req.body.product_id,
	user_id = req.body.user_id,
	name = req.body.name,
	order = req.body.order;

	//check if users has added such product to cart before
    const store = [user_id, product_id];
    
    Order.makeOrders(store, function(data){
        const update = [ order, user_id, product_id ];
	    	if(data.length !== 0){ //true then update no of orders made
                Order.update(update, function(data){
                    if(data) res.send('cart successfully updated');
                });
	    	}else{ // users just added new product to cart
	    		const post = {
	    			user_id: user_id, 
	    			product_id: product_id, 
	    			orders:order,
	    			username: name
	    		}
                
                Order.insert(post, function(data){
                    if(data) res.send("successfully added to cart");
                });
	    	}
    });
}

OrderController.numberOfOrders = function(req, res){
    const id = req.params.id;
    Order.fetchTotalNumberOfOrders(res, function(data){
        const response = data.filter(row => row.user_id == parseInt(id));
        var sum = 0;
        if(response.length!==0){
            const resp = response.map(result => {
                sum = sum + result.orders;
                return sum;
            });
            const total_orders = resp[resp.length-1];
            res.send(`${total_orders}`);
        }
        else res.send(`${sum}`);
    });
}

OrderController.myOrdersdetails = function(req, res){
    const id = req.params.id;
	var key = 0, sum = 0;
	
    Order.fetchMyOrders(res, function(data){
        const response = data.filter(row => row.user_id == parseInt(id));
        if(response.length!==0){
            const resp = response.map(result => {
                let price = parseInt(result.price),
                    order = result.orders,
                    total = price * order;
                    sum = sum + total;
                let	user_id = result.user_id,
                    product_id = result.product_id,
                    data = {
                        key: key,
                        name: result.productname,
                        price: price,
                        orders: order,
                        quantity: result.quantity,
                        total: total,
                        sum: sum,
                        product_id: product_id,
                        user_id: user_id
                    };
                key++;
                return data;
            });
            res.send(resp);
        }else res.send([]);
    })
}

OrderController.deleteOrders = function(req, res){
    const user_id = req.body.user_id,
	product_id = req.body.product_id,
    array = [user_id, product_id];
    
    Order.delete(array, function(data){
        if(data.affectedRows > 0) res.send('successful deleted');
    });
}

module.exports = OrderController;