var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Reviews = sequelize.define('reviews', {
  ReviewID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CustomerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Score: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      len: [1,5]
    }
  },
  ReviewText: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: true
});

module.exports = Reviews;
