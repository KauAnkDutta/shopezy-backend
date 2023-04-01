const route = require("express").Router()
const { userMiddleware, customerMiddleware } = require('../middleware/user')
const orderCtrl = require('../controller/orderCtrl')

route.post(`/user/createOrder`, userMiddleware, customerMiddleware, orderCtrl.createOrder)

route.get(`/user/readOrders`, userMiddleware, customerMiddleware, orderCtrl.getOrder)

module.exports = route