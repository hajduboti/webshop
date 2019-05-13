const Sequelize = require('sequelize');

const sequelize = new Sequelize('WebShop', 'root', 'root', {
    host: 'localhost',
    dialect: 'mssql'
  });
module.exports = sequelize;