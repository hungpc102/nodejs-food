const express = require('express')
const app = express()
const UserRoute = require('./Routes/User.route')
const FoodRoute = require('./Routes/Food.route')
const CartRoute = require('./Routes/Cart.route')
const OrderRoute = require('./Routes/Order.route')
const OrderDetailRoute = require('./Routes/OrderDetail.route')

const createError = require('http-errors')
require('dotenv').config()
// require('./helpers/connections_mongodb')
// require('./helpers/connections_mssql')


app.get('/', (req, res, next) => {
    res.send('Home page')
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', UserRoute)

app.use('/food', FoodRoute)

app.use('/cart', CartRoute)

app.use('/order', OrderRoute)

app.use('/orderDetail', OrderDetailRoute)



app.use((req, res, next) => {
    // const error = new Error('Not Found')
    // error.status = 500
    // next(error)
    next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    res.json ({
        status: err.status || 500,
        message: err.message
    })
})

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`)
})