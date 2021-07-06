const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const sendemail = require('../controllers/email.controller')

/**
 * @openapi
 * /api/users/update:
 *   post:
 *     description: user upload product
 *     responses:
 *        '200':
 *          description: Successfully uploaded
 *        '403':
 *          description: validation error
 *        '500':
 *          description: internal error
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
 * /api/users/sendmail:
 *   post:
 *     description: user send mail
 *     responses:
 *        '200':
 *          description: Successfully sent email
 *        '403':
 *          description: validation error
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
 * /api/users/:
 *   get:
 *     description: get all users
 *     responses:
 *        '200':
 *          description: ok
 *     produces:
 *       - application/json
 */
router.get('/', userController.getAllUsers)

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     description: get user by id
 *     responses:
 *        '200':
 *          description: ok
 *        '404':
 *          description: not found
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
 * /api/users/profile:
 *   post:
 *     description: user upload picture
 *     responses:
 *        '200':
 *          description: Successfully uploaded
 *        '403':
 *          description: validation error
 *        '500':
 *          description: internal error
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
 * /api/users/delete/{id}:
 *   delete:
 *     description: delete user
 *     responses:
 *        '204':
 *          description: Successfully deleted
 *        '404':
 *          description: not found
 *        '500':
 *          description: internal error
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
