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
 *       - name: use_id
 *         in: body
 *         required: true
 *         type: string
 *      - name: name
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
 *     description: user make orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         in: body
 *         required: true
 *         type: string
 *       - name: use_id
 *         in: body
 *         required: true
 *         type: string
 *      - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: order
 *         in: body
 *         required: true
 *         type: string
 */
router.post('/delete', orderController.deleteOrders)

//total orders
router.get('/total/:id', orderController.getNumberOfOrders)

//my order details
router.get('/details/:id', orderController.getMyOrdersdetails)

module.exports = router
