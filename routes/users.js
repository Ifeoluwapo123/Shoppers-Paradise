const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const userController = require('../controllers/userController');
const sendemail = require('../controllers/emailController');

//middlewares
router.use(bodyparser.urlencoded({extended:false}));
router.use(express.json());
router.use(express.static('public'));

//upload product
router.post('/upload', userController.userUploadProduct);

//receive mail
router.post('/sendmail', sendemail.sendMessage);

//geting all users
router.get('/users', userController.allUsers);

//getting users by id
router.get('/users/:id', userController.currentUser);

//user registration
router.post('/users', userController.userRegisteration);

//update user password
router.post('/user/update', userController.updatePassword);

//users login
router.post('/user/login', userController.userlogin);

//upload profile pics
router.post('/profile', userController.userUploadPic);

//delete user
router.delete('/user/delete/:id', userController.deleteUser);

module.exports = {router: router};