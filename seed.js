
const sequelize = require('./mssql');
const dbFunctions = require('./dbFunctions')


const User = require('./models/user');
const Images = require('./models/image');
const Orders = require('./models/order');
const OrderItems = require('./models/orderitems');
const Product = require('./models/products');
const Reviews = require('./models/reviews');
const SubCategories = require('./models/subcategories');
const Categories = require('./models/categories');
const Quantities = require('./models/quantities');

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

OrderItems.belongsTo(Orders, { foreignKey:"OrderID", as:"OrderItems" ,constrains: true, onDelete: 'CASCADE'});
Orders.hasMany(OrderItems, {foreignKey:"OrderID", as:"OrderItems"});

Orders.belongsTo(User,{foreignKey:"UserID", as:"User"});



sequelize
.sync({ force: true })
.then(result => {
  console.log("Seeding the Database")
  Categories.create({
    CategoryName: "Pants",
    SubCategories:[{ SubCategoryName: "Jeans"}]
  },{
    include: ['SubCategories']
  }).then(result=>{
    for(i=0; i<30; i++){
      Product.create({
        ProductName: "Leggings", 
        Brand: "Addidas",
        Description: "Elastic close-fitting garments worn over the legs",  
        Price: 50,
        Images :[{ Url:"https://imagescdn.simons.ca/images/4907/17783/41/A1_2.jpg" },{ Url:"https://imagescdn.simons.ca/images/4907/17783/41/A1_1.jpg" }],
        Reviews : [{
          CustomerName : "Donis",
          Score : 5,
          ReviewText : "Amazing pants very good."
        }],
        SubCategoryID : 1,
        Quantities: [{
          Size: "L",
          QuantityOnStock: 20,
          Weight: 1
        },
        {
          Size: "M",
          QuantityOnStock: 20,
          Weight: 1
        }]
      },{
        include: ['Images','Reviews','Quantities']
      })
      .then(product =>{
        // console.log(product);
      })
      }
  })

  User.create({
    FirstName: "FirstName",
    LastName: "LastName",
    Email: "FirstName@mail.com",
    Password: "123456",
    City: "Denmark",
    Postcode: 4000,
    Address: "Address",
    UserType: "user"
  })
  
    sequelize.query('DROP PROC IF EXISTS UpdateQuantity;');
    sequelize.query(`
      CREATE PROC UpdateQuantity (@qnt INT, @ProductID INT, @Size VARCHAR(50))
      AS
      BEGIN
      DECLARE @quantity INT = (SELECT QuantityOnStock FROM dbo.quantities WHERE ProductID = @ProductID AND Size = @Size )
      IF @quantity > @qnt
        UPDATE dbo.quantities
        SET QuantityOnStock = QuantityOnStock - @qnt ,SoldQuantity = SoldQuantity + @qnt
        WHERE ProductID = @ProductID AND Size = @Size
      ELSE
        RAISERROR ('No enough products in storage', 16, 1);
      END
    `).then(() =>console.log("Procedure created")); 
  })


  // sequelize.query('Select * from Reviews', { type: Sequelize.QueryTypes.SELECT }).then(function(rows) {
//   console.log(rows);
// });
  
// User.create({UserID:1, FirstName: "BillyBobby", LastName: "Boy", Email: 'BillyBobbyBoy@com.com', Password:'root', City:'Copenhagen', Postcode:2400, Address:'WestPlace', UserType:'Customer' }).then(Billy => {
//   console.log("Billys's auto-generated ID:", Billy.UserID);
// });
