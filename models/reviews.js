var DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Reviews = sequelize.define('reviews', {
  ReviewID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CustomerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Score: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      len: [1,5]
    }
  },
  ReviewText: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
  hasTrigger: true
});

module.exports = Reviews;
