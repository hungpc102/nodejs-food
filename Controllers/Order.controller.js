const OrderSchema = require('../Models/Order.model')

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      // Lấy dữ liệu từ body request
      const { USER_ID, ADDRESS, SHIPPING_FEE, TOTAL_INVOICE, ORDER_NAME, TOTAL_PAYMENT } = req.body;
  
      const newOrder = await OrderSchema.create({
        USER_ID,
        ADDRESS,
        TOTAL_INVOICE,
        SHIPPING_FEE,
        ORDER_NAME,
        TOTAL_PAYMENT
      });
  
      return res.status(200).json({
        status: 'okay',
        elements: newOrder
      });
    } catch (error) {
      next(error);
    }
  },
  getAllOrder: async (req, res, next) => {
    try {
      const { OrderStatus } = req.params;
      let sortBy = 'DESC';
      if (OrderStatus === 'Pending'|| OrderStatus === 'Delivering') {
        sortBy = 'ASC';
      }
      const orders = await OrderSchema.findAll({
        where: { ORDER_STATUS: OrderStatus },
        order: [['createdAt', sortBy]] // Di chuyển câu lệnh sắp xếp lên ngoài phạm vi where
      });
  
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
          const ORDER_ID = req.params.OrderId;
          const {ORDER_STATUS} = req.body;
          console.log(ORDER_STATUS)

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

    },
    
    getOrder: async (req, res, next) => {
        try {
          const { UserId, OrderStatus } = req.params// Lấy thông tin UserId và OrderStatus từ query parameters
      
          if (!UserId || !OrderStatus) {
            return res.status(400).json({ error: 'Thiếu thông tin yêu cầu.' });
          }
      
          const orders = await OrderSchema.findAll({ 
            where: {
            USER_ID: UserId,
            ORDER_STATUS: OrderStatus
             },
            order: [['createdAt', 'DESC']]
        });
      
          if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng.' });
          }
      
          return res.status(200).json({ orders });
        } catch (error) {
          next(error)
        }
      },
      getOrderById: async (req, res, next) => {
        try {
          const {OrderId } = req.params// Lấy thông tin UserId và OrderStatus từ query parameters
      
          const orders = await OrderSchema.findOne({ 
            where: {
              ORDER_ID: OrderId,
             },
        });
      
          if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng.' });
          }
      
          return res.status(200).json({ orders });
        } catch (error) {
          next(error)
        }
      },
      
}