const FoodSchema = require('../Models/Food.model')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_service');
const client = require('../helpers/connections_redis')
const createError = require('http-errors')
;

module.exports = {
 
  getAll: async (req, res, next) => {
    try {
        const foods = await FoodSchema.findAll();

        if (!foods || foods.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
            return;
        }

        // Chuyển đổi binary thành base64 (nếu cần)
        const foodsWithBase64 = foods.map(food => {
            if (food.FOOD_PICTURE) {
                food.FOOD_PICTURE = food.FOOD_PICTURE.toString('base64');
            }
            return food;  
        });

        // Trả về dữ liệu cho frontend
        res.json({ foods: foodsWithBase64 });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    }
  },

  createFood:async (req, res, next) => {
    try {
      // Lấy dữ liệu từ body request
      const { FOOD_NAME, FOOD_INFO, FOOD_PRICE, FOOD_QUANTITY, CATEGORY , FOOD_PICTURE } = req.body;
  
      const imageBuffer = Buffer.from(req.body.FOOD_PICTURE, 'base64');
      // Tạo một bản ghi mới trong cơ sở dữ liệu
      const newFood = new FoodSchema({
        FOOD_NAME,
        FOOD_INFO,
        FOOD_PRICE,
        FOOD_QUANTITY,
        CATEGORY,
        FOOD_PICTURE:imageBuffer
      });
      const saveFood = await newFood.save();

      return res.status(200).json({
        status: 'okay',
        elements: saveFood
    });
  
      // Trả về thành công
    } catch (error) {
      next(error);
    }
  },

}