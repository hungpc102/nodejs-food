const UserSchema = require('../Models/User.model')
const {userValidate} =  require('../helpers/validation')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_service');
const client = require('../helpers/connections_redis')
const createError = require('http-errors')


module.exports = {
    register: async (req, res, next) => {
        try {
            const { USER_NAME, USER_PHONE, USER_EMAIL, USER_PASSWORD } = req.body;
            const { error } = userValidate(req.body, isRegister = true);
    
            if (error) {
                // Trả về lỗi dưới dạng phản hồi JSON
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const isExists = await UserSchema.findOne({
                where: { USER_EMAIL }
            });
    
            if (isExists) {
                // Trả về lỗi dưới dạng phản hồi JSON
                return res.status(409).json({ error: `${USER_EMAIL} has already been registered` });
            }
    
            const user = new UserSchema({
                USER_EMAIL,
                USER_PASSWORD,
                USER_NAME,
                USER_PHONE
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
    
            const accessToken = await signAccessToken(user.USER_ID);
            const refreshToken = await signRefreshToken(user.USER_ID);
    
            res.json({
                accessToken,
                refreshToken,
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
        const statusLogin = 
            {
            status: 'true'
            }
        
        
        res.json({
            statusLogin
        })
    },
}