const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const OrderDetailController = require('../Controllers/OrderDetail.controller')

route.post('/create-orderDetail',verifyAccessToken, OrderDetailController.createOrderDetail)

module.exports = route;