var Sequelize = require("sequelize");
const sequelize = require('../mssql');


const Image = sequelize.define('image', {
    ImageID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ProductID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Url:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Image;
