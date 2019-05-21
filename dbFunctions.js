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




///////////////////   Create Procedure to update quantity metrics     //////////////////////////
initUpdateQuantity: function(){
    sequelize.query(
        "alter procedure UpdateQuantity " +
        "(@s nvarchar(255) , @id int) " +
        "AS "+
        
        "declare @Size nvarchar(255) "+
        "set @Size = @s "+
        
        "declare @productID int "+
        "set @productID = @id " +
        
        "declare @SoldQuantity int "+
        "set @SoldQuantity = (select SUM(Quantity) from orderItems where ProductID = @productID )"+
        
        "declare @QuantityInStock int "+
        "set @QuantityInStock = (select QuantityOnStock from quantities where ProductID = @productID ) - @SoldQuantity "+
        
        "declare @Weight float "+
        "set @Weight = (select  weight from orderItems where ProductID = @productID) "+
        
        "declare @ProductQuantityID int "+
        "set @ProductQuantityID = (select ProductQuantityID from quantities where ProductID = @productID ) "+
        
        "update quantities "+
        "set size=@size, QuantityOnStock = @QuantityInStock, SoldQuantity = @SoldQuantity, weight = @weight where ProductQuantityID = @ProductQuantityID and ProductID = @productID "
        
        
    )  .then(result =>{
          console.log("Procedure created " + result)
      }); 
    },


UpdateQuantity: function(size, productID){
    console.log( "Exec UpdateQuantity @s="+size+"" +", @id="+productID+"" )

    sequelize.query( "Exec UpdateQuantity @s="+size+"" +", @id="+productID+"" )

    sequelize.query('Select * from Quantities', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
    console.log(rows);
})

}

// sequelize.query("insert into Quantities(Size, QuantityOnStock, SoldQuantity, Weight, ProductID) "+  "values('S', 200, 0, 2.0, 1)")
// sequelize.query( "Insert into orderItems(ProductName, Quantity, OrderPrice, Weight, ProductID) "+
// "values('Stuff', 50, 15.00, 2.0, 1)")

};
