const CartSchema = require('../Models/Cart.model')


module.exports = {
  createCart: async (req, res, next) => {
    try {
      // Lấy dữ liệu từ body request
      const { USER_ID, FOOD_ID, QUANTITY } = req.body;
  
      // Tìm kiếm cart với cả USER_ID và FOOD_ID trong cơ sở dữ liệu
      const existingCart = await CartSchema.findOne({
        where: {
          USER_ID,
          FOOD_ID
        }
      });
  
      if (existingCart) {
        // Nếu đã có cart với cùng USER_ID và FOOD_ID, cập nhật cart cũ bằng cách thêm QUANTITY mới
        existingCart.QUANTITY += QUANTITY;
        const updatedCart = await existingCart.save();
  
        return res.status(200).json({
          status: 'okay',
          elements: updatedCart
        });
      } else {
        // Nếu không có cart tồn tại, tạo một bản ghi mới trong cơ sở dữ liệu
        const newCart = new CartSchema({
          USER_ID,
          FOOD_ID,
          QUANTITY
        });
        const saveCart = await newCart.save();
  
        return res.status(200).json({
          status: 'okay',
          elements: saveCart
        });
      }
    } catch (error) {
      next(error);
    }
  },
  
      getCart:async (req, res, next) => {
        const { id } = req.params; 
        try {
          const cart = await CartSchema.findAll({ where: { USER_ID: id } });
      
          if (!cart) {
            res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
            return;
          }
      
          // Trả về dữ liệu cho frontend
          res.json({ cart });
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu theo ID:', error);
          res.status(500).json({ error: 'Đã có lỗi xảy ra' });
        }
      },
      updateQuantityFood: async (req, res, next) => {
        try {
          const userId = req.params.user_id;
          const foodId = req.params.food_id;

          const { QUANTITY } = req.body;
          
          const cartItem = await CartSchema.findOne({
            where: {
              USER_ID: userId,
              FOOD_ID: foodId
            }
          });
          
          console.log(cartItem)
          if (!cartItem) {
            return res.status(404).json({ error: `Không tìm thấy món ăn với FOOD_ID ${foodId} trong giỏ hàng của người dùng` });
          }
      
          if (QUANTITY === 0) {
            // Nếu QUANTITY bằng 0, xoá món hàng khỏi giỏ hàng
            await cartItem.destroy();
            return res.status(200).json({
              status: 'deleted',
              elements: 'deleted'
            });
          }
      
          // Cập nhật QUANTITY và lưu lại
          cartItem.QUANTITY = QUANTITY;
          await cartItem.save();
      
          return res.status(200).json({
            status: 'okay',
            elements: cartItem
          });
        } catch (error) {
          next(error);
        }
      },
      deleteCart:  async (req, res, next) => {
        try {
          const userId = req.params.id;
      
          const cartItems = await CartSchema.findAll({
            where: {
              USER_ID: userId,
            }
          });
      
          if (cartItems.length === 0) {
            return res.status(404).json({ error: `Không tìm thấy cart` });
          }
      
          // Xóa từng mục giỏ hàng
          for (const cartItem of cartItems) {
            await cartItem.destroy();
          }
      
          return res.status(200).json({
            status: 'Xoá thành công',
            elements: 'Xoá thành công'
          });
        } catch (error) {
          next(error);
        }
      }
      
}