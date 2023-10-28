const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/connections_mssql');

const CartSchema = sequelize.define('CARTS', {
        USER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FOOD_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        QUANTITY: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        CART_ID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true, 
            field: 'CART_ID',
        }
    },
    {
    tableName: 'CARTS',
    timestamps: false, 
    }
)


module.exports = CartSchema;
