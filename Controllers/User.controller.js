const UserSchema = require('../Models/User.model')
const {userValidate, validatePassword} =  require('../helpers/validation')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_service');
const client = require('../helpers/connections_redis')
const createError = require('http-errors')


module.exports = {
    register: async (req, res, next) => {
        try {
            const { USER_NAME, USER_PHONE, USER_EMAIL, USER_PASSWORD, USER_IS_RESTAURANT} = req.body;
            const { error } = userValidate(req.body, isRegister = true);
    
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const isExists = await UserSchema.findOne({
                where: { USER_EMAIL }
            });
    
            if (isExists) {
                return res.status(409).json({ error: `${USER_EMAIL} has already been registered` });
            }

    
            const user = new UserSchema({
                USER_EMAIL,
                USER_PASSWORD,
                USER_NAME,
                USER_PHONE,
                USER_IS_RESTAURANT,
            });
            const saveUser = await user.save();
    
            return res.status(200).json({
                status: 'okay',
                elements: saveUser
            });
    
        } catch (error) {
            next(error);
        }
    },
    refreshToken:async(req, res, next) => {
        try{
            console.log(req.body)
            const {refreshToken} = req.body
            if(!refreshToken) throw createError.BadRequest()
    
            const {userId} = await verifyRefreshToken(refreshToken)
            const accessToken = await signAccessToken(userId)
            const refToken =  await signRefreshToken(userId)
            res.json({
                accessToken,
                refreshToken: refToken
            })
            
        }catch(error){
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const { error } = userValidate(req.body, (isRegister = false));
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const { USER_EMAIL, USER_PASSWORD } = req.body;

            const user = await UserSchema.findOne({
                where: { USER_EMAIL },
            });
    
            if (!user) {
                return res.status(404).json({ error: 'Người dùng chưa đăng kí' });
            }
    
            const isValid = await user.isCheckPassword(USER_PASSWORD);
    
            if (!isValid) {
                return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu chưa chính xác' });
            }

            let isRestaurant = false;

            if (user.USER_IS_RESTAURANT === true) {
                isRestaurant = true;
            }
    
            const accessToken = await signAccessToken(user.USER_ID, isRestaurant);
            const refreshToken = await signRefreshToken(user.USER_ID);
    
            res.json({
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    },
    
    logout:async(req, res, next) => {
        try{
            const {refreshToken} = req.body
            if(!refreshToken){
                throw createError.BadRequest()
            }
            const {userId} = await verifyRefreshToken(refreshToken)
            client.del(userId.toString(), (err, reply) => {
                if(err){
                    throw createError.InternalServerError()
                }
                res.json({
                    message: 'Logout!'
                })
            })
        }catch(error){
            next(error)
        }
    },
    getlists:async(req, res, next) => {
        console.log(req.headers)
        const listUsers = [
            {
            email: 'abc@gmail.com'
            },
            {
            email: 'def@gmail.com'
            }
        ]
        res.json({
            listUsers
        })
    },
    getSaveLogin:async(req, res, next) => {
        console.log(req.headers)
        const statusLogin = true
        res.json({
            statusLogin
        })
    },

    protectedRoute: (req, res, next) => {
        const isRestaurant = req.payload.isRestaurant;
        const userId = req.payload.userId;
    
        if (isRestaurant === true) {
            res.json({ role: 'restaurant', userId });
        } else {
            res.json({ role: 'user', userId });
        }
    },
    
    updatePassword:async (req, res, next) => {
        try {
            const userId = req.params.id;
            const { USER_PASSWORD, NEW_USER_PASSWORD } = req.body;
    
            const { error } = validatePassword({ NEW_USER_PASSWORD });
    
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            if(NEW_USER_PASSWORD === USER_PASSWORD ){
                return res.status(400).json({ error: 'Mật khẩu mới phải khác mật khẩu cũ' });
            }
    
            const existingUser = await UserSchema.findByPk(userId);
            if (!existingUser) {
                return res.status(404).json({ error: `Người dùng với ID ${userId} không tồn tại` });
            }
    
            const isValid = await existingUser.isCheckPassword(USER_PASSWORD);
    
            if (!isValid) {
                return res.status(401).json({ error: 'Mật khẩu chưa chính xác' });
            }
    
            // Sử dụng hàm beforeCreate để mã hóa mật khẩu mới
            existingUser.USER_PASSWORD = await existingUser.hashPassword(NEW_USER_PASSWORD);
    
            await existingUser.save();
    
            return res.status(200).json({
                status: 'okay',
                elements: existingUser
            });
        } catch (error) {
            next(error);
        }
    },
    getUserId: async (req, res, next) => {
        const { id } = req.params; // Lấy ID từ URL
        try {
          const user = await UserSchema.findOne({ where: { USER_ID: id } });
      
          if (!user) {
            res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
            return;
          }
      
          // Trả về dữ liệu cho frontend
          res.json({ user });
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu theo ID:', error);
          res.status(500).json({ error: 'Đã có lỗi xảy ra' });
        }
      }
}