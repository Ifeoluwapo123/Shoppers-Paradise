const Order = require('../models/Order')
const handleResponse = require('../utils/response.js')
const OrderController = function () {}

OrderController.makeOrders = function (req, res) {
  const { product_id, user_id, name, order } = req.body

  //check if users has added such product to cart before
  Order.makeOrders([user_id, product_id], function (err, data) {
    if (err) handleResponse(req, res, 500)

    if (data.length) {
      //true then update no of orders made
      Order.update([order, user_id, product_id], function (err) {
        if (err) {
          handleResponse(req, res, 500)
        } else handleResponse(req, res, 204)
      })
    } else {
      // users just added new product to cart
      Order.insert(
        {
          user_id: user_id,
          product_id: product_id,
          orders: order,
          username: name,
        },
        function (err) {
          if (err) {
            handleResponse(req, res, 500)
          } else {
            handleResponse(req, res, 204)
          }
        },
      )
    }
  })
}

OrderController.getNumberOfOrders = function (req, res) {
  const id = req.params.id
  Order.fetchTotalNumberOfOrders(function (err, data) {
    if (err) handleResponse(req, res, 500)
    else {
      const response = data.filter((row) => row.user_id == parseInt(id))
      let sum = 0
      if (response.length) {
        const resp = response.map((result) => {
          sum = sum + result.orders
          return sum
        })

        handleResponse(req, res, 200, {
          data: resp[resp.length - 1],
        })
      } else
        handleResponse(req, res, 200, {
          data: sum,
        })
    }
  })
}

OrderController.getMyOrdersdetails = function (req, res) {
  const id = req.params.id

  Order.fetchMyOrders(function (err, data) {
    if (err) handleResponse(req, res, 500)
    else {
      const response = data.filter((row) => row.user_id == parseInt(id))
      if (response.length) {
        let sum = 0
        const newResponse = response.map((result, key) => {
          sum += Number(result.price) * Number(result.orders)
          return {
            key: key,
            name: result.productname,
            price: Number(result.price),
            orders: result.orders,
            quantity: result.quantity,
            total: Number(result.price) * Number(result.orders),
            sum: sum,
            product_id: result.product_id,
            user_id: result.user_id,
          }
        })
        handleResponse(req, res, 200, {
          data: newResponse,
        })
      } else
        handleResponse(req, res, 200, {
          data: response,
        })
    }
  })
}

OrderController.deleteOrders = function (req, res) {
  const { user_id, product_id } = req.body

  Order.delete([user_id, product_id], function (err, data) {
    if (err) handleResponse(req, res, 500)
    else if (data.affectedRows > 0) res.send('successful deleted')
    else handleResponse(req, res, 404, null)
  })
}

module.exports = OrderController
