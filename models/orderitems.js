var Sequelize = require("sequelize");
const sequelize = require('../mssql');


const OrderItems = sequelize.define('orderItems', {
    OrderItemID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    OrderID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ProductName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    OrderPrice:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    Weight:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = OrderItems;