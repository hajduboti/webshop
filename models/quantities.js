var DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Quantities = sequelize.define('quantities', {
  ProductQuantityID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  QuantityOnStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SoldQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue : 0
  },
  Weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Quantities;
