var DataTypes = require("sequelize");
const sequelize = require('../mssql');

const SubCategories = sequelize.define('subcategories', {
  SubCategoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  SubCategoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = SubCategories;
