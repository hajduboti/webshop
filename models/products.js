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
  Description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      len: [0,10000]
    }
  },
  Price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      len : [0,1000000]
    }
  },
  SoldQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      len: [0,1000000]
    }
  },
  Category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  SubCategory:{
    type: Sequelize.STRING,
    allowNull: false
  },
  Weight: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}, 
{
  timestamps: false
});

module.exports = Products;


