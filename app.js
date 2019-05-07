const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
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

app.listen(80,'localhost', function () {
  console.log("server is running");
});
