const DataTypes = require("sequelize");
const sequelize = require('../mssql');
const bcrypt = require("bcrypt");

const Model = DataTypes.Model;
class User extends Model {
  getFullname() {
    return [this.FirstName, this.LastName].join(' ');
  }
  comparePasswords(password){
    return bcrypt.compare(password,this.Password)
  }
}

User.init({
  UserID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  FirstName:{
      type: DataTypes.STRING,
      allowNull: false
  },
  LastName:{
      type: DataTypes.STRING,
      allowNull: false
  },
  Email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  PhoneNumber:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  Password:{
      type: DataTypes.STRING,
      allowNull: false
  },
  City:{
      type: DataTypes.STRING,
      allowNull: false
  },
  Postcode:{
      type: DataTypes.STRING,
      allowNull: false
  },
  Address:{
      type: DataTypes.STRING,
      allowNull: false
  },
  UserType:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : "user"
  }
}, {
  sequelize,
  modelName: 'users',
  timestamps: true
});

User.beforeCreate((user, options) => {
  return bcrypt.hash(user.Password, 12).then(hash =>{
    user.Password = hash;
  });
});

module.exports = User;
