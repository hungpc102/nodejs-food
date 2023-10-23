const express = require('express');
const route = express.Router();

const { verifyAccessToken} = require('../helpers/jwt_service');

const UserController = require('../Controllers/User.controller')




route.post('/register', UserController.register);

route.post('/refresh-token', UserController.refreshToken)

route.post('/login', UserController.login);

route.post('/protected-route',verifyAccessToken, UserController.protectedRoute);

route.delete('/logout', UserController.logout);

route.get('/getlists', verifyAccessToken, UserController.getlists)

route.get('/getSaveLogin', verifyAccessToken, UserController.getSaveLogin)

route.get('/getById/:id', UserController.getUserId)

route.patch('/updatePassword/:id', verifyAccessToken, UserController.updatePassword)


module.exports = route;
