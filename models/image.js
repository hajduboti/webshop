var Sequelize = require("sequelize");
const sequelize = require('../mssql');

const Image = sequelize.define('image', {
    ImageID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Url:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Image;
