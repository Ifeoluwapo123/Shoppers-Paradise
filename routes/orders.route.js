const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.use(express.static('public'))

/**
 * @openapi
 * /:
 *   post:
 *     description: user make orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         in: body
 *         required: true
 *         type: string
 *       - name: user_id
 *         in: body
 *         required: true
 *         type: string
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: order 
 *         in: body
 *         required: true
 *         type: string
 */
router.post('/', orderController.makeOrders)

/**
 * @openapi
 * /delele:
 *   post:
 *     description: delete user's order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         in: params
 *         required: true
 *         type: string
 *       - name: product_id
 *         in: params
 *         required: true
 *         type: string
 */
router.post('/delete', orderController.deleteOrders)

/**
 * @openapi
 * /total:
 *   get:
 *     description: get numbers of orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: string
 */
router.get('/total/:id', orderController.getNumberOfOrders)

/**
 * @openapi
 * /total:
 *   get:
 *     description: get order detais
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: string
 */
router.get('/details/:id', orderController.getMyOrdersdetails)

module.exports = router
