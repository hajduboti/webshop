var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Products = sequelize.define('products', {
    ProductID:{
    type: Sequelize.INTEGER,
    primaryKey: true
    },
    ProductName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Description:{
        type: Sequelize.STRING,
        allowNull: false  
    },
    Quantity:{
        type: Sequelize.INTEGER,
        allowNull: false  
    },
    Price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    SoldQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    Category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Weight:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Products;


