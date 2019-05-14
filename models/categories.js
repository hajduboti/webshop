var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Categories = sequelize.define('categories', {
  CategoryID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CategoryName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Categories;
