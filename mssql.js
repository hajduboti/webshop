const Sequelize = require('sequelize');
const DB_NAME = 'WebShop' 

const sequelize = new Sequelize( DB_NAME, 'root', 'root', {
    host: 'localhost',
    dialect: 'mssql',
    logging: true,
    multipleStatements: true
  });

module.exports = sequelize;