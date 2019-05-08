const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const allRoutes = require('./routes/all-routes');
const Sequelize = require('sequelize');
const sequelize = require('./mssql');

const Users = require('./models/user');
const Images = require('./models/image');
const Orders = require('./models/order');
const OrderItems = require('./models/orderitems');
const Products = require('./models/products');
const reviews = require('./models/reviews');

const app = express();
app.use('/dist',express.static(path.join(__dirname, 'dist'), { maxAge: '30 days' }));
app.use('/assets',express.static(path.join(__dirname, 'assets'), { maxAge: '30 days' }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
///===============================
////     SERVER ROUTES
///===============================
app.use('/',allRoutes);

////////////////////////////////////////////////
//// Error handling
////////////////////////////////////////////////
//// 404 route handling
app.use((req,res,next)=>{
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});
//// error handling////
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

  
//// ////
app.listen(8001,'localhost', function () {
  console.log("server is running");
});


DB_NAME = 'WebShop'   //The Database Name to be used




sequelize.query('use ' + DB_NAME).then(function(rows) {
  console.log(rows);
})
.catch(function(){
  console.log('Error -- Database ' + DB_NAME + ' doesnt exist')
});



// return sequelize.query("CREATE DATABASE " + DB_NAME).then(data => {
//     return User;
// });


// Users.create({UserID:1, FirstName: "BillyBobby", LastName: "Boy", Email: 'BillyBobbyBoy@com.com', Password:'root', City:'Copenhagen', Postcode:2400, Address:'WestPlace', UserType:'Customer' }).then(Billy => {
//   console.log("Billys's auto-generated ID:", Billy.UserID);
// });


// sequelize.query('Select * from Users', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
//   console.log(rows);
// });
