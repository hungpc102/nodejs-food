const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const OrderController = require('../Controllers/Order.controller')

route.post('/create-order',verifyAccessToken, OrderController.createOrder)

route.get('/getAllOrder', OrderController.getAllOrder)

route.patch('/updateOrder/:id', OrderController.updateOrder)


module.exports = route;