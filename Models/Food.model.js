const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/connections_mssql');

const FoodSchema = sequelize.define('FOODS', {
      FOOD_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true, 
        field: 'FOOD_ID',
      },
      FOOD_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      FOOD_INFO: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FOOD_PICTURE: {
        type: DataTypes.BLOB,
        allowNull: true, 
      },
      FOOD_PRICE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      FOOD_QUANTITY: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CATEGORY: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
},
      {
        tableName: 'FOODS',
        timestamps: false, 
    }
)

module.exports = FoodSchema;