const Product = require('../models/productsModel');
const fs = require('fs');

const ProductController = function(){};

ProductController.userProducts = function(req, res){
    const id = req.params.id;
    Product.productsByUsers(id, res, function(data){
        const response = data.filter(row => row.user_id === parseInt(id));
        if(!response.length) res.send([]);
        else{
            const resp = response.map(result => {
                let img_name = result.image_name,
                base = fs.readFileSync(`./public/images/${img_name}`).toString('base64'),
                ext = img_name.substring(img_name.indexOf('.')+1, img_name.length),
                image = `data:image/${ext};base64,${base}`;
                data = {...result, 'image': image};
                return data;
            });
            res.send(resp);
        } 
    });
}

ProductController.otherProducts = function(req, res){
    const id = req.query.id;
    Product.productsNotByUser(id, res, function(data){
        const response = data.filter(row => row.user_id !== parseInt(id));
        const resp = response.map(result => {
            let img_name = result.image_name.trim(),
                base = fs.readFileSync(`./public/images/${img_name}`).toString('base64'),
                ext = img_name.substring(img_name.indexOf('.')+1, img_name.length),
                image = `data:image/${ext};base64,${base}`;
                data = {...result, 'image': image};
                return data;
        });
		res.send(resp);
    });
}

ProductController.deleteProducts = function(req, res){
    const product_id = req.body.id;
    Product.delete(product_id, function(data){
        if(data.affectedRows > 0) res.send('successful deleted');
    });
}


module.exports = ProductController;