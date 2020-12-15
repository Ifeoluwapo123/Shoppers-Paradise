const Product = require('../models/productsModel');
const fs = require('fs');
const config = require('../config').image;
const Storage = require('../dist/storage');


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

ProductController.update = function(req, res){
    let setPath = new Storage(config.product, config.filetypes),
    upload = setPath.uploadFile();

    upload(req, res, (err)=>{
		if(err){
			res.send({message : "error while uploading"});
		}else{
			if(req.file == undefined){
				res.send({message : "no file selected"});
			}else{
				if(req.body.productname === '' || req.body.price === ''){
					res.send({message: 'field(s) cannot be empty'});

					fs.unlink('./public/images/'+req.file.filename, (err, success)=>{
						if(err){
							console.log("can't remove the image");
						}else{
							console.log("succesfully removed file");
						}
				    });
					
					return;
                }

				if(req.body.type === 'Select product type'){
					res.send({message: 'select product type'});
					return;
                }

                if(req.body.price === '' || req.body.quantity === '' || req.body.quantity === ''){
                    res.send({message: 'field(s) cannot be empty'});
                }

				const post = [
					req.body.type,
					req.body.price,
					req.file.filename,
                    req.body.quantity,
                    req.body.productname,
                    req.body.productid
                ]
				
                Product.update(post, function(data){
                    if(data) res.send({message: 'successful updated'});
                });
			}
		}
	});
}


module.exports = ProductController;