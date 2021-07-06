const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const sendemail = require('../controllers/email.controller')

/**
 * @openapi
 * /update:
 *   post:
 *     description: user upload product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productname
 *         in: body
 *         required: true
 *         type: string
 *       - name: user_id
 *         in: body
 *         required: true
 *         type: string
 *       - name: price
 *         in: body
 *         required: true
 *         type: string
 *       - name: quantity
 *         in: body
 *         required: true
 *         type: string
 *       - name: image_name
 *         in: multipart/formData
 *         required: true
 *         type: string
 */
router.post('/upload', userController.uploadUserProduct)

/**
 * @openapi
 * /sendmail:
 *   post:
 *     description: user send mail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sender
 *         in: body
 *         required: true
 *         type: string
 *       - name: message
 *         in: body
 *         required: true
 *         type: string
 *       - name: subject
 *         required: true
 *         type: string
 */
router.post('/sendmail', sendemail.sendMessage)

/**
 * @openapi
 * /:
 *   get:
 *     description: get all users
 *     produces:
 *       - application/json
 */
router.get('/', userController.getAllUsers)

/**
 * @openapi
 * /{id}:
 *   get:
 *     description: get user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: string
 */
router.get('/:id', userController.getCurrentUser)

/**
 * @openapi
 * /profile:
 *   post:
 *     description: user upload picture
 *     produces:
 *       - application/json
 *     parameters:
 *       - user_id: sender
 *         in: body
 *         required: true
 *         type: string
 *       - filename: message
 *         in: formData
 *         required: true
 *         type: string
 */
router.post('/profile', userController.userUploadPic)

/**
 * @openapi
 * /delete/{id}:
 *   delete:
 *     description: user send mail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sender
 *         in: params
 *         required: true
 *         type: string
 */
router.delete('/delete/:id', userController.deleteUser)

module.exports = router
