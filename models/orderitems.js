const DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Model = DataTypes.Model;

class OrderItems extends Model { }
OrderItems.init({
  OrderItemID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  Size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Weight: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
  {
    timestamps: false,
    hooks: {
      afterValidate: (OrderItem, options) => {
        return sequelize.query(
          'Exec UpdateQuantity @qnt=:Quantity, @ProductID=:ProductID, @Size=:Size',
          { 
            transaction: options.transaction,
            type: sequelize.QueryTypes.RAW,
            replacements: { Quantity: OrderItem.Quantity, ProductID: OrderItem.ProductID, Size: OrderItem.Size, }
          }
        )
      },
      beforeValidate: (OrderItem, options) =>{
        return sequelize.query(`SELECT Price FROM products WHERE ProductID=:ProductID`,{
          replacements: { ProductID: OrderItem.ProductID },
          type: sequelize.QueryTypes.SELECT,
          transaction: options.transaction
        }).then(result =>{
          if(OrderItem.Price != result[0].Price){
            throw new Error('Price of the item does not match price in the database');            
          }    
        })
      }
    },
    sequelize
  });

module.exports = OrderItems;
