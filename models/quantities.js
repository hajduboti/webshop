var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Quantities = sequelize.define('quantities', {
  ProductQuantityID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  QuantityOnStock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  SoldQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Weight: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Quantities;
