const OrderDetailSchema = require('../Models/OrderDetail.model')

module.exports = {
    createOrderDetail:async (req, res, next) => {
        try {
          // Lấy dữ liệu từ body request
          const { ORDER_ID, FOOD_ID, UNIT_QUANTITY, UNIT_PRICE} = req.body;
      
            const newOrderDetail = new OrderDetailSchema({
                ORDER_ID, 
                FOOD_ID, 
                UNIT_QUANTITY,
                UNIT_PRICE,
            });

            const saveOrderDetail = await newOrderDetail.save();
      
            return res.status(200).json({
              status: 'okay',
              elements: saveOrderDetail
            });
          
        } catch (error) {
          next(error);
        }
      },
      getOrderDetail: async (req, res, next) => {
        const  order_id  = req.params.OrderId; 
        console.log(order_id)
        try {
          const orderDetails = await OrderDetailSchema.findAll({ where: { ORDER_ID: order_id } });
      
          if (!orderDetails || orderDetails.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
            return;
          }
      
          // Trả về dữ liệu cho frontend
          res.json({ orderDetails });
        } catch (error) {
          next(error)
        }
      },
      
}