const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const FoodController = require('../Controllers/Food.controller')
const FoodSchema = require('../Models/Food.model')

const multer = require('multer');

// Cấu hình Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });




route.get('/get-all', FoodController.getAll);

route.get('/getById/:id', FoodController.getFoodId)

route.get('/search', FoodController.searchFood)

route.post('/create-food', upload.single('file'), FoodController.createFood)



module.exports = route;


