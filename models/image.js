var DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Image = sequelize.define('image', {
  ImageID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
  });

module.exports = Image;
