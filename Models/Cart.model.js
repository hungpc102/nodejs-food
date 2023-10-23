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
        FOOD_CATEGORY: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        }
    },
    {
    tableName: 'CARTS',
    timestamps: false, 
    }
)

module.exports = CartSchema;
