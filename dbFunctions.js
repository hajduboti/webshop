const sequelize = require('./mssql');
var Sequelize = require("sequelize");

module.exports = {

///////////////   Stored Procedure to recalculate a products score  ////////////////////  
 initRecalculateScore: function(){

  sequelize.query("CREATE PROCEDURE RecalculateScore " +
  "AS " +
  "update Products " +
  "set Score = (select SUM(score)/COUNT(ReviewID * 1.0) " +
  "from reviews " +
  "where Products.ProductID = reviews.ProductID) " +
  "from Products " +
  "GO " +
  "Exec RecalculateScore "
  ).then(result =>{
      console.log("Recaluclated Review Score " + result)
  });
},


RecalculateScore: function(){
    
  sequelize.query('RecalculateScore').then(function(){
    sequelize.query('Select * from Products ', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
      console.log(rows);
    });
    })
  .catch(err => {
    console.log(err);
  });
},

initUpdateReviewTrigger: function(){
sequelize.query("create trigger updateReviews on reviews " +
    "after insert as " +
    "begin " +
    "exec RecalculateScore "+
    "end ")
console.log("Created ReviewUpdate Trigger")
},




///////////////////   Create Procedure to update quantity metrics     //////////////////////////
initUpdateQuantity: function(){
    sequelize.query(
      `
        alter procedure UpdateQuantity
        (@id int, @orderID int)
        AS
        declare @productID int
        set @productID = @id
        declare @order int
        set @order = @orderID 
        declare @SoldQuantity int
        set @SoldQuantity = (select SUM(Quantity) from orderItems where ProductID = @productID)
        declare @QuantityInStock int
        set @QuantityInStock = (select QuantityOnStock from quantities where ProductID = @productID ) - (@SoldQuantity where orderItemID = @orderID)
        declare @ProductQuantityID int
        set @ProductQuantityID = (select ProductQuantityID from quantities where ProductID = @productID )
        update quantities 
        set QuantityOnStock = @QuantityInStock, SoldQuantity = @SoldQuantity where ProductQuantityID = @ProductQuantityID and ProductID = @productID
      `
    )  .then(result =>{
          console.log("Procedure created " + result)
      }); 
    },


UpdateQuantity: function(productID, orderID){
    sequelize.query( "Exec UpdateQuantity @id="+productID+"" +", @orderID="+orderID+";" )

    sequelize.query('Select * from Quantities', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
    console.log(rows);
})

}

// sequelize.query("insert into Quantities(Size, QuantityOnStock, SoldQuantity, Weight, ProductID) "+  "values('S', 200, 0, 2.0, 1)")
// sequelize.query( "Insert into orderItems(ProductName, Quantity, OrderPrice, Weight, ProductID) "+
// "values('Stuff', 50, 15.00, 2.0, 1)")

};
