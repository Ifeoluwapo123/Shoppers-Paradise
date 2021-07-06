const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.use(express.static('public'))

/**
 * @openapi
 * /api/orders/:
 *   post:
 *     description: user make orders
 *     responses:
 *        '204':
 *          description: Successfully order
 *        '500':
 *          description: Internal server error
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
 * /api/orders/delele:
 *   post:
 *     description: delete user's order
 *     responses:
 *        '200':
 *          description: Successfully deleted order
 *        '404':
 *          description: not found
 *        '500':
 *          description: internal problem
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
 * /api/orders/total:
 *   get:
 *     description: get numbers of orders
 *     responses:
 *        '200':
 *          description: ok
 *        '505':
 *          description: internal server error
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
 * /api/orders/total:
 *   get:
 *     description: get order detais
 *     responses:
 *        '200':
 *          description: ok
 *        '500':
 *          description: internal server error
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
