const DataTypes = require("sequelize");
const sequelize = require('../mssql');

const Model = DataTypes.Model;

class OrderItems extends Model {}
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
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Weight: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  ProductQuantityID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  hooks: {
    afterValidate: (OrderItem, options) => {
      const quantity = OrderItem.Quantity;
      const oderItemID = OrderItem.OrderItemID;
      const query = "Exec UpdateQuantity @qnt=" + quantity +", @oderItemID="+oderItemID+";";
      return sequelize.query(query, { transaction: options.transaction});
    }
  },
  sequelize
});

module.exports = OrderItems;
