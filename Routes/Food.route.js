const express = require('express');
const route = express.Router();

const {verifyAccessToken} = require('../helpers/jwt_service');
const FoodController = require('../Controllers/Food.controller')

const multer = require('multer');

// Cấu hình Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });




route.get('/get-all', FoodController.getAll);

route.get('/getById/:id', FoodController.getFoodId)

route.get('/search', FoodController.searchFood)

route.post('/create-food',verifyAccessToken, upload.single('file'), FoodController.createFood)

route.delete('/delete-food/:id',verifyAccessToken, FoodController.deleteFood)

route.put('/update-food/:id',verifyAccessToken, upload.none(), FoodController.updateFood)

route.patch('/update-quantity/:id', verifyAccessToken, FoodController.updateQuantity)



module.exports = route;


