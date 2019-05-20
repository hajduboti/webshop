var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Brands = sequelize.define('brands', {
  BrandName: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
    timestamps: false
  });

module.exports = Brands;
