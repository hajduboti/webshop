const Sequelize = require('sequelize');
const DB_NAME = 'WebShop' 

const sequelize = new Sequelize( DB_NAME, 'root', 'root', {
    host: 'localhost',
    dialect: 'mssql'
  });

module.exports = sequelize;