var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const SubCategories = sequelize.define('subcategories', {
  SubCategoryID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  SubCategoryName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = SubCategories;
