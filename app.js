const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const allRoutes = require('./routes/all-routes');
const sequelize = require('./mssql');

const Users = require('./models/user');
const Images = require('./models/image');
const Orders = require('./models/order');
const OrderItems = require('./models/orderitems');
const Product = require('./models/products');
const Reviews = require('./models/reviews');
const SubCategories = require('./models/subcategories');
const Categories = require('./models/categories');
const Brands = require('./models/brands');
const Quantities = require('./models/quantities');

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
/// Relations ///
Product.hasMany( Reviews, { foreignKey:"ProductID"});
Reviews.belongsTo( Product, { foreignKey:"ProductID", constrains: true, onDelete: 'CASCADE' });

Product.hasMany(Images, { foreignKey:"ProductID" ,constrains: true, onDelete: 'CASCADE'});
Images.belongsTo( Product, { foreignKey:"ProductID" ,constrains: true, onDelete: 'CASCADE'});

Brands.hasMany(Product, {foreignKey:"BrandID" ,constrains: true, onDelete: 'CASCADE'});
Product.belongsTo(Brands, {foreignKey:"BrandID" ,constrains: true, onDelete: 'CASCADE'});

/*
Product.hasMany(Quantities, {foreignKey:"ProductQuantityID"});
Quantities.belongsTo(Product, { foreignKey:"ProductQuantityID", constrains: true, onDelete: 'CASCADE' });

Product.hasOne(SubCategories, {foreignKey:"SubCategoryID"});
SubCategories.belongsTo(Product, { foreignKey:"SubCategoryID", constrains: true, onDelete: 'CASCADE' });

SubCategories.hasOne(Categories, {foreignKey:"CategoryID"});
Categories.belongsTo(SubCategories,  { foreignKey:"CategoryID", constrains: true, onDelete: 'CASCADE' });
*/
Users.hasMany(Orders, {foreignKey:"UserID"});
OrderItems.belongsTo(Product, { foreignKey:"ProductID" ,constrains: true, onDelete: 'CASCADE'});
Orders.hasMany(OrderItems, {foreignKey:"OrderID"});


//// connect,synch to database run WebServer ////

sequelize
  .sync({ force: true })
  .then(result => {
    // console.log(result);
    for(i=0; i<30; i++){
      Product.create({ProductID: i, 
        ProductName: "Leggings", 
        Description: "Elastic close-fitting garments worn over the legs ", 
        Quantity: '300', 
        Price:'50.00', 
        SoldQuantity:'0', 
        Category:'Pants',
        SubCategory:'Jeans', 
        Weight:'.25',
        images :[{ Url:"https://imagescdn.simons.ca/images/4907/17783/41/A1_2.jpg" }],
        reviews : [{
          CustomerName : "Donis",
          Score : 5,
          ReviewText : "Amazing pants very good."
        }] 
      },{
        include: ['images','reviews']
      })
      // .then(product =>{
      //   console.log(product);
      // })
    }
    app.listen(8001,'localhost', function () {
      console.log("server is running");
    });
  })
  .catch(err => {
    console.log(err);
  });

  
// Users.create({UserID:1, FirstName: "BillyBobby", LastName: "Boy", Email: 'BillyBobbyBoy@com.com', Password:'root', City:'Copenhagen', Postcode:2400, Address:'WestPlace', UserType:'Customer' }).then(Billy => {
//   console.log("Billys's auto-generated ID:", Billy.UserID);
// });


// sequelize.query('Select * from Users', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
//   console.log(rows);
// });
