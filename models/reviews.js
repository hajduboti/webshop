var Sequelize = require("sequelize");
const sequelize = require('../mssql');


const Reviews = sequelize.define('reviews', {
    ReveiwID:{
    type: Sequelize.INTEGER,
    primaryKey: true
    },
    ProductID:{
        type: Sequelize.INTEGER,
        references: 'products',
        referencesKey: 'productid',
        allowNull: false
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
},{
    sequelize,
    modelName: 'reviews'
});