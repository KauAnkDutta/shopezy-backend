const route = require('express').Router()

const stripeCtrl = require('../controller/stripeCtrl')

route.use(`/user/stripe/payment`, stripeCtrl.acceptPayment)

module.exports = route;