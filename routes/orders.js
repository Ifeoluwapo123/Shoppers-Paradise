const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router()
const orderController = require('../controllers/orderController');

router.use(bodyparser.urlencoded({extended:false}));
router.use(express.json());
router.use(express.static('public'));

//user make order(s)
router.post('/order', orderController.makeOrders);

//delete order
router.post('/order/delete', orderController.deleteOrders);

//total orders
router.get('/all_orders/:id', orderController.numberOfOrders);

//my order details
router.get('/my_orders/:id', orderController.myOrdersdetails);

module.exports = {router: router};
