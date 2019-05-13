var Sequelize = require("sequelize");
const sequelize = require('../mssql');
const OrderItems = require('../models/orderitems.js')
const Users = require('../models/user')

const Orders = sequelize.define('orders', {
    OrderID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    UserID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    PaymentID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    TotalPrice:{
        type: Sequelize.DOUBLE,
        allowNull: false

    }
});

module.exports = Orders;
