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
            replacements: { Quantity: OrderItem.Quantity, ProductID: OrderItem.ProductID, Size: OrderItem.Size, },
            transaction: options.transaction
          }
        )
      },
      beforeValidate: (OrderItem, options) =>{
        return sequelize.query(`SELECT Price FROM products WHERE ProductID=:ProductID`,{
          replacements: { ProductID: OrderItem.ProductID },
          type: sequelize.QueryTypes.SELECT
        }).then(result =>{
          OrderItem.Price = result[0].Price;
        })
      }
    },
    sequelize
  });

module.exports = OrderItems;
