const User = require('../models/userModel');
const fs = require('fs'),
    bcrypt = require('bcrypt'),
    joi = require('@hapi/joi'),
    config = require('../config').image;
    Storage = require('../dist/storage');

var UserController = function(){};

UserController.allUsers = function(req,res){
    User.findAll(function(data){
        res.send(data);
    });
}

UserController.currentUser = function(req, res){
    const id = req.params.id;
    User.findOne(id, function(data){
        if(data){
            const img_name = data.profile_pics.trim(),
            base = fs.readFileSync(`./public/profileimages/${img_name}`).toString('base64'),
            ext = img_name.substring(img_name.indexOf('.')+1, img_name.length),
            image = `data:image/${ext};base64,${base}`,
            result = {...data, 'image': image};
            res.send(result);
        }else res.send({});
    });
}

UserController.userRegisteration = function(req, res){
    const name = req.body.name,
	email = req.body.email,
	password = req.body.password,
	phone = req.body.phone,
	regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
	regPhone = /^[0]\d{10}$/;
	regPhone1 = /^[\+]?[234]\d{12}$/;

	const schema = joi.object().keys({
		name: joi.string().min(4).trim().required(),
		email: joi.string().trim().email().required(),
		password: joi.string().min(5).required(),
		phone: joi.required()
	});

	if(!regName.test(name)){
		res.send('enter full name');
		return;
	}

	if(!regPhone.test(phone) && !regPhone1.test(phone)){
		res.send('Not a nigeria number format');
		return;
	}
	
	const {error} = schema.validate(req.body);
	
	if(error) res.send(error.details[0].message);
	else{
		const post = {
			name: name,
			email: email,
			phone: phone,
			password: bcrypt.hashSync(password,10),
			profile_pics: 'noimage.jpg'
		}
		
        User.register(post, function(data){
            if(data) res.send("successfully registered");
        });
	}
}

UserController.userlogin = function(req, res){
    const email = req.body.email,
	    password = req.body.password;

	if(email === "" || password === ""){
		res.send({status: 'input field(s) cannot be empty'});
		return;
	}

    User.validation(email, function(data){
        if(data){
            if(bcrypt.compareSync(password,data.password)){
             res.send({status:'successful', id: data.id});
            }else res.send({status:'invalid password'});
         }else{
             res.send({status: 'invalid email address'});
         }
    });
}

UserController.userUploadPic = function(req, res){
    let setPath = new Storage(config.profile, config.filetypes);
    upload = setPath.uploadFile();

    upload(req, res, (err)=>{
		if(err){
			res.send({message : "error while uploading"});
		}else{
			if(req.file == undefined){
				res.send({message : "no file selected"});
			}else{
				const post = [ req.file.filename, req.body.user_id ];
				
                User.uploadpics(post, function(data){
                    if(data) res.send('image successfully uploaded');
				});
			}
		}
	});
}

UserController.userUploadProduct = function(req, res){
    let setPath = new Storage(config.product, config.filetypes);
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

				const post = {
					type: req.body.type,
					productname: req.body.productname,
					price: req.body.price,
					image_name: req.file.filename,
					quantity: req.body.quantity,
					user_id: req.body.user_id
				}
				
				User.uploadproduct(post, function(data){
                    if(data) res.send({message : "succesfully uploaded"});
                });
			}
		}
	});
}

UserController.updatePassword = function(req, res){
    const password = req.body.password,
	      confirmpassword = req.body.confirmpassword,
	      email = req.body.email;

	const schema = joi.object().keys({
		password: joi.string().min(5).required(),
		email: joi.string().trim().email().required(),
		confirmpassword: joi.string().min(5).required()
	});

	if(password !== confirmpassword){
		res.send('passwords does not match');
		return;
    }

    const {error} = schema.validate(req.body);
    if(error){
        res.send(error.details[0].message);
        return;
    } 
    
    User.validation(email, function(data){
        if(data){
            const data = [bcrypt.hashSync(password,10), email];
            User.update(data, function(data){
				if(data) res.send('password successfully updated');
            })
        }else{
			res.send('enter valid email');
		}
    });
}

UserController.deleteUser = function(){
    const id = [req.params.id];
    User.delete(id, function(data){
        if(data.affectedRows > 0) res.send('successful deleted');
        else res.status(401).send(`No user with the id of ${id}`);
    });
}

module.exports = UserController;