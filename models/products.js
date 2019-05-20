var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Products = sequelize.define('products', {
  ProductID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ProductName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
    len : [0,1000000]
    }
  },
  Score: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue : 0,
    validate: {
    len : [0,5]
    }
  },

}, {
    timestamps: false
  });

module.exports = Products;


