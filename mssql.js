const Sequelize = require('sequelize');

const sequelize = new Sequelize('Webshop', 'root', 'root', {
    host: 'localhost',
    dialect: 'mssql'
  });
module.exports = sequelize;