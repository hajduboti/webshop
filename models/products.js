const DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Products = sequelize.define('products', {
  ProductID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
    len : [0,1000000]
    }
  },
  Score: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue : 0,
    validate: {
    len : [0,5]
    }
  }
}, {
    timestamps: false,
    indexes:[
      {
      unique: false,
      fields:['SubCategoryID']
    }
    ]
  });

module.exports = Products;


