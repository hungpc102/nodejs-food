const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const OrderController = require('../Controllers/Order.controller')

route.post('/create-order',verifyAccessToken, OrderController.createOrder)

route.get('/getAllOrder/:OrderStatus', OrderController.getAllOrder)

route.patch('/updateOrder/:OrderId',verifyAccessToken, OrderController.updateOrder)

route.get('/getOrder/:UserId/:OrderStatus', OrderController.getOrder)

route.get('/getOrderById/:OrderId', OrderController.getOrderById)

module.exports = route;