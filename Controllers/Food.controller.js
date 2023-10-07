const FoodSchema = require('../Models/Food.model')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_service');
const client = require('../helpers/connections_redis')
const createError = require('http-errors')
;

module.exports = {
 
  getAll: async (req, res, next) => {
    try {
      // Lấy tất cả dữ liệu món ăn
      const foods = await FoodSchema.findAll();
  
      // Chuyển đổi đường dẫn ảnh thành đường dẫn tuyệt đối để frontend có thể hiển thị
      const foodsWithAbsoluteImagePaths = await Promise.all(foods.map(async (food) => {
        const imagePath = food.FOOD_PICTURE;
        const imageContent = await fs.promises.readFile(imagePath, 'base64');
        const absoluteImagePath = `${req.protocol}://${req.get('host')}${imagePath}`;
        
        return {
          ...food.toJSON(),
          FOOD_PICTURE: absoluteImagePath,
          IMAGE_CONTENT: imageContent,
        };
      }));
  
      // Trả về dữ liệu cho frontend
      res.json(foodsWithAbsoluteImagePaths);
    } catch (err) {
      console.error('Lỗi truy vấn CSDL:', err);
      next(err);
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