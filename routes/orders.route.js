const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.use(express.static('public'))

//user make order(s)
router.post('/', orderController.makeOrders)

//delete order
router.post('/delete', orderController.deleteOrders)

//total orders
router.get('/total/:id', orderController.getNumberOfOrders)

//my order details
router.get('/details/:id', orderController.getMyOrdersdetails)

module.exports = router
