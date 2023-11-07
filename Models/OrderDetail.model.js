const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/connections_mssql');
const FoodSchema = require('./Food.model')
const OrderSchema = require('./Order.model')

const OrderDetailSchema = sequelize.define('ORDER_DETAILS', {
        ORDER_DETAIL_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true, 
            field: 'ORDER_DETAIL_ID',
        },
        FOOD_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FoodSchema, 
                key: 'FOOD_ID', 
            }
        },
        ORDER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: OrderSchema, 
                key: 'ORDER_ID', 
            }
        },
        UNIT_PRICE:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UNIT_QUANTITY:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'ORDER_DETAILS',
        timestamps: false, 
    }
)

module.exports = OrderDetailSchema;