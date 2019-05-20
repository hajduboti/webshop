const DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Orders = sequelize.define('orders', {
  OrderID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  PaymentID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TotalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

module.exports = Orders;

