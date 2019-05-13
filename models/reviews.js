var Sequelize = require("sequelize");
const sequelize = require('../mssql');
const Product = require('./products');

const Reviews = sequelize.define('reviews', {
    ReviewID:{
    type: Sequelize.INTEGER,
    primaryKey: true
    },
    CustomerName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Score:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    ReviewText:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Reviews;
