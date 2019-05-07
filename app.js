const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const allRoutes = require('./routes/all-routes');
const Sequelize = require('sequelize');

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
//// DB Connection////

const sequelize = new Sequelize('Webshop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mssql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//// ////
app.listen(8001,'localhost', function () {
  console.log("server is running");
});
