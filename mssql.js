const Sequelize = require('sequelize');
const DB_NAME = 'WebShop' 

const sequelize = new Sequelize( DB_NAME, 'root', 'root', {
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
    multipleStatements: true
  });

module.exports = sequelize;