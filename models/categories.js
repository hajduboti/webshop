var DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Categories = sequelize.define('categories', {
  CategoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Categories;
