const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const sendemail = require('../controllers/email.controller')

//upload product
router.post('/upload', userController.uploadUserProduct)

//receive mail
router.post('/sendmail', sendemail.sendMessage)

//geting all users
router.get('/', userController.getAllUsers)

//getting users by id
router.get('/:id', userController.getCurrentUser)

//upload profile pics
router.post('/profile', userController.userUploadPic)

//delete user
router.delete('/delete/:id', userController.deleteUser)

module.exports = router
