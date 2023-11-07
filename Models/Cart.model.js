const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/connections_mssql');
const UserSchema = require('./User.model')
const FoodSchema = require('./Food.model')



const CartSchema = sequelize.define('CARTS', {
        USER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserSchema, 
                key: 'USER_ID', 
            }
        },
        FOOD_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FoodSchema, 
                key: 'FOOD_ID', 
            }
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
