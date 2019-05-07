var Sequelize = require("sequelize");
const sequelize = require('../mssql');


const Orders = sequelize.define('orders', {
    OrderID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    UserID:{
        type: Sequelize.INTEGER,
        references: 'users',
        referencesKey: 'userid',
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
},{
    sequelize,
    modelName: 'orders'
});
