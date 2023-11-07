const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/connections_mssql');
const UserSchema = require('./User.model')

const OrderSchema = sequelize.define('ORDERS', {
        ORDER_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true, 
            field: 'ORDER_ID',
        },
        USER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserSchema, 
                key: 'USER_ID', 
            }
        },
        ADDRESS:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        TOTAL_INVOICE:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ORDER_STATUS:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        SHIPPING_FEE:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'ORDERS',
        timestamps: false, 
    }
)

module.exports = OrderSchema;