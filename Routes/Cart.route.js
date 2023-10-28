const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const CartController = require('../Controllers/Cart.controller')

route.post('/create-cart', CartController.createCart)

route.get('/get-cart/:id', CartController.getCart)

route.patch('/update-quantity/:user_id/:food_id', CartController.updateQuantityFood);

module.exports = route;
