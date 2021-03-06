
///===============================
////     Node modules
///===============================
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const allRoutes = require('./routes/all-routes');
const sequelize = require('./mssql');
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redis');

redisClient.on('connect', function() {
  console.log('Redis client connected');
});
redisClient.on('error', function(err) {
  console.log(err);
});
///===============================
////     Models
///===============================
const User = require('./models/user');
const Images = require('./models/image');
const Orders = require('./models/order');
const OrderItems = require('./models/orderitems');
const Product = require('./models/products');
const Reviews = require('./models/reviews');
const SubCategories = require('./models/subcategories');
const Categories = require('./models/categories');
const Quantities = require('./models/quantities');


const methodOverride = require("method-override");
const app = express();

///===============================
////     SERVE STATIC FILES
///===============================

app.use('/dist',express.static(path.join(__dirname, 'dist'), { maxAge: '30 days' }));
app.use('/assets',express.static(path.join(__dirname, 'assets'), { maxAge: '30 days' }));
app.set('views', path.join(__dirname, 'views'));

///===============================
////     APP SETTINGS
///===============================

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(require('cookie-parser')());

///===============================
////     PASSPORT AUTH
///===============================

app.use(session({ 
  secret: 'passport-tutorial', 
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  store: new RedisStore({ client: redisClient, ttl :  1000 * 60 * 60 * 24 * 30}),
  resave: false, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {  
  done(null, user.UserID);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then(result =>{
    done(null, result);
  }).catch(err => {
    done(err, null);
  })
});

passport.use(new LocalStrategy({
  usernameField : 'Email',
  passwordField : 'Password'
}, 
function(username, password, done) {
  User.findOne({
    where: {
      Email: username
    }
  }).then(user => {
    if(!user){
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    user.comparePasswords(password).then(result =>{
      if(!result){
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    })
  }).catch(err=> done(err));
}));

///===============================
////     SERVER ROUTES
///===============================
app.use('/',allRoutes);

////////////////////////////////////////////////
            //// Error handling////
////////////////////////////////////////////////

//////////////// 404 route handling////////////////
app.use((req,res,next)=>{
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});
//////////////// 500 error handling////////////////
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



// /// Relations ///
// Product.hasMany( Reviews, { foreignKey:"ProductID", as:"Reviews"});
// Reviews.belongsTo( Product, { foreignKey:"ProductID",as:"Reviews", constrains: true, onDelete: 'CASCADE' });

// Product.hasMany(Images, { foreignKey:"ProductID", as:"Images" ,constrains: true, onDelete: 'CASCADE'});
// Images.belongsTo( Product, { foreignKey:"ProductID", as:"Images" ,constrains: true, onDelete: 'CASCADE'});


// Quantities.belongsTo(Product, { foreignKey:"ProductID" ,  as:"Quantities",constrains: true, onDelete: 'CASCADE'});
// Product.hasMany(Quantities, {foreignKey:"ProductID",  as:"Quantities",constrains: true, onDelete: 'CASCADE'});

// Product.belongsTo(SubCategories, {foreignKey:"SubCategoryID", as:"SubCategory",constrains: true, onDelete: 'CASCADE'});
// SubCategories.hasMany(Product, {foreignKey:"SubCategoryID", as:"SubCategory" ,constrains: true, onDelete: 'CASCADE'});

// Categories.hasMany(SubCategories, {foreignKey:"CategoryID",as:"SubCategories", constrains: true, onDelete: 'CASCADE'});
// SubCategories.belongsTo(Categories, {foreignKey:"CategoryID", as:"SubCategories",constrains: true, onDelete: 'CASCADE'});


// User.hasMany(Orders, {foreignKey:"UserID"});
// Orders.belongsTo(User, { foreignKey:"UserID",constrains: true, onDelete: 'CASCADE'});

// Orders.hasMany(OrderItems, {foreignKey:"OrderID", as:"OrderItems"});
// OrderItems.belongsTo(Orders, { foreignKey:"OrderID", as:"OrderItems" ,constrains: true, onDelete: 'CASCADE'});


Product.hasMany( Reviews, { foreignKey:"ProductID", as:"Reviews"});
Reviews.belongsTo( Product, { foreignKey:"ProductID",as:"Reviews", constrains: true, onDelete: 'CASCADE' });

Product.hasMany(Images, { foreignKey:"ProductID", as:"Images" ,constrains: true, onDelete: 'CASCADE'});
Images.belongsTo( Product, { foreignKey:"ProductID", as:"Images" ,constrains: true, onDelete: 'CASCADE'});

Quantities.belongsTo(Product, { foreignKey:"ProductID" ,  as:"Quantities",constrains: true, onDelete: 'CASCADE'});
Product.hasMany(Quantities, {foreignKey:"ProductID",  as:"Quantities",constrains: true, onDelete: 'CASCADE'});

Product.belongsTo(SubCategories, {foreignKey:"SubCategoryID", as:"SubCategory",constrains: true, onDelete: 'CASCADE'});
SubCategories.hasMany(Product, {foreignKey:"SubCategoryID", as:"SubCategory" ,constrains: true, onDelete: 'CASCADE'});

Categories.hasMany(SubCategories, {foreignKey:"CategoryID",as:"SubCategories", constrains: true, onDelete: 'CASCADE'});
SubCategories.belongsTo(Categories, {foreignKey:"CategoryID", as:"SubCategories",constrains: true, onDelete: 'CASCADE'});

Orders.hasMany(OrderItems, {foreignKey:"OrderID", as:"OrderItems"});
OrderItems.belongsTo(Orders, { foreignKey:"OrderID", as:"OrderItems" ,constrains: true, onDelete: 'CASCADE'});
//// connect,synch to database run WebServer ////
Orders.belongsTo(User,{foreignKey:"UserID", as:"User"});

sequelize
.sync({ force: false })
.then(() => {
    sequelize.query('DROP TRIGGER IF EXISTS UpdateReviewTrigger;');
    sequelize.query(`
      CREATE TRIGGER UpdateReviewTrigger ON reviews
      AFTER INSERT
      AS
      SET NOCOUNT ON;
      DECLARE @productID INT = (SELECT ProductID FROM inserted)
      DECLARE @Score FLOAT = (SELECT AVG(Score) FROM reviews WHERE ProductID = @productID)
      UPDATE dbo.products
          SET Score = @Score
          WHERE ProductID = @ProductID
    `).then(()=>console.log("Trigger Created"))
    app.listen(8001,'localhost', function () {
      console.log("server is running");
    }); 
});





