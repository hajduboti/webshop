var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Image = sequelize.define('image', {
  ImageID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Url: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Image;
