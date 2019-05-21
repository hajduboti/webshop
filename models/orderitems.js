const DataTypes = require("sequelize");
const sequelize = require('../mssql');


const OrderItems = sequelize.define('orderItems', {
  OrderItemID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  OrderPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Weight: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = OrderItems;
