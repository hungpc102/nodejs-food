const express = require('express');
const route = express.Router();

const {vefifyAccessToken} = require('../helpers/jwt_service');
const FoodController = require('../Controllers/Food.controller')
const FoodSchema = require('../Models/Food.model')



const multer = require('multer');

// Cấu hình Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });




route.get('/get-all', FoodController.getAll);

// API để lưu dữ liệu món ăn
route.post('/create-food', upload.single('file'), FoodController.createFood)

route.get('/get-image', async (req, res, next) => {
    try {
        const food = await FoodSchema.findOne({
            where: { FOOD_ID: 1021 }, // Sửa điều kiện tìm kiếm thành FOOD_ID: 1021
        });

        if (!food || !food.FOOD_PICTURE) {
            res.status(404).json({ error: 'Không tìm thấy dữ liệu hình ảnh' });
            return;
        }

        // Chuyển đổi binary thành base64
        const base64Data = food.FOOD_PICTURE.toString('base64');

        // Trả về dữ liệu base64 cho frontend
        res.json({ image: base64Data });
        console.log('thành công')
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hình ảnh:', error);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    }
});


module.exports = route;


