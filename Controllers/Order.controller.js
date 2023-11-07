const OrderSchema = require('../Models/Order.model')

module.exports = {
    createOrder:async (req, res, next) => {
      try {
        // Lấy dữ liệu từ body request
        const { USER_ID, ADDRESS, SHIPPING_FEE, TOTAL_INVOICE} = req.body;
    
          const newOrder = new OrderSchema({
              USER_ID, 
              ADDRESS, 
              TOTAL_INVOICE,
              SHIPPING_FEE
          });
          const saveOrder = await newOrder.save();
    
          return res.status(200).json({
            status: 'okay',
            elements: saveOrder
          });
        
      } catch (error) {
        next(error);
      }
    },
    getAllOrder: async (req, res, next) => {
      try {
          const orders = await OrderSchema.findAll();
  
          return res.status(200).json({
              status: 'okay',
              elements: orders
          });
      } catch (error) {
          next(error);
      }
    },
    updateOrder:async (req, res, next) => {
      try {
          const ORDER_ID = req.params.id;
          const {ORDER_STATUS} = req.body;
  
          const order = await OrderSchema.findOne({
              where: {
                  ORDER_ID: ORDER_ID
              }
          });
  
          if (!order) {
              return res.status(404).json({
                  status: 'not found',
                  message: 'Không tìm thấy đơn đặt hàng với ORDER_ID đã cho.'
              });
          }
  
          // Cập nhật trạng thái đơn đặt hàng
          order.ORDER_STATUS = ORDER_STATUS;
  
          // Lưu thay đổi
          await order.save();
  
          return res.status(200).json({
              status: 'okay',
              message: 'Trạng thái đơn đặt hàng đã được cập nhật.'
          });
      } catch (error) {
          next(error);
      }
  }
  
}