var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Brands = sequelize.define('brands', {
  BrandID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  BrandName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Brands;
