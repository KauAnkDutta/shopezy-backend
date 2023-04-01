const route = require('express').Router()

const {userMiddleware, customerMiddleware} = require('../middleware/user')

const cartCtrl = require('../controller/cartCtrl')

route.post(`/updateCart`,userMiddleware, customerMiddleware, cartCtrl.updateCart);
route.post(`/removeItem`, userMiddleware, customerMiddleware, cartCtrl.removeItems)
route.get(`/restCart`, userMiddleware, customerMiddleware, cartCtrl.resetTheCart)
route.post(`/createCart`,userMiddleware, customerMiddleware, cartCtrl.createCart)
route.get(`/getItems`, userMiddleware, customerMiddleware, cartCtrl.getItems)


module.exports = route;