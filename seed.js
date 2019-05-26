
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
  })
  .then(result=>{
    for(i=0; i<30; i++){
      Product.create({
        ProductName: "Jeans", 
        Brand: "Levy",
        Description: "Denim trousers.",  
        Price: 50,
        Images :[{ Url:"https://images-na.ssl-images-amazon.com/images/I/71vdopEovDL._UX342_.jpg" }],
        Reviews : [
          {
          CustomerName : "Donis",
          Score : 5,
          ReviewText : "Amazing pants very good."
          },
          {
            CustomerName : "Tom",
            Score : 3,
            ReviewText : "Amazing pants very good."
          }
        ],
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
        include: ['Images','Quantities','Reviews']
      })
      .then(product =>{
        // console.log(product);
      })
      }
  })
  .then(result =>{
    Categories.create({
      CategoryName: "Shoes",
      SubCategories:[{ SubCategoryName: "Running"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<20; i++){
        Product.create({
          ProductName: "Trainers", 
          Brand: "Nike",
          Description: "Shoes for sports",  
          Price: 100,
          Images :[{ Url:"https://www.kicksusa.com/media/wysiwyg/brands/nike/Running.jpg" }],
          SubCategoryID : 2,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 20,
            Weight: 2
          },
          {
            Size: "M",
            QuantityOnStock: 20,
            Weight: 2
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Tops",
      SubCategories:[{ SubCategoryName: "Shirts"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<30; i++){
        Product.create({
          ProductName: "Dress Shirt", 
          Brand: "Calvin Klein",
          Description: "Nice, semi-formal shirt",  
          Price: 75,
          Images :[{ Url:"https://a3655836d5c58a086ac2-4e8d43a89f100386d472e9f1a1dc59ca.ssl.cf3.rackcdn.com/images/extralarge/966219101_01.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 3,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 40,
            Weight: .75
          },
          {
            Size: "M",
            QuantityOnStock: 40,
            Weight: .75
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Shoes",
      SubCategories:[{ SubCategoryName: "Sneakers"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<30; i++){
        Product.create({
          ProductName: "Sneakers", 
          Brand: "Adidas",
          Description: "Sneakers for general activities",  
          Price: 90,
          Images :[{ Url:"https://assets.adidas.com/images/w_600,h_600,f_auto,q_auto:sensitive,fl_lossy/d285610e30664900b857a7fa00ed0201_9366/Superstar_Shoes_White_C77124_01_standard.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 4,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 52,
            Weight: 1.5
          },
          {
            Size: "M",
            QuantityOnStock: 12,
            Weight: 1.5
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Pants",
      SubCategories:[{ SubCategoryName: "Sweat Pants"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<50; i++){
        Product.create({
          ProductName: "Sweat Pants", 
          Brand: "Patagonia",
          Description: "Comfortable, long pants for chilling or sporting.",  
          Price: 50,
          Images :[{Url:"https://lp2.hm.com/hmgoepprod?set=source[/08/81/0881c663d72d5f5561de3c2a90ec7d8b11e4fe5f.jpg],origin[dam],category[men_trousers_joggers],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 5,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 61,
            Weight: 1
          },
          {
            Size: "M",
            QuantityOnStock: 9,
            Weight: 1
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Pants",
      SubCategories:[{ SubCategoryName: "Sweat Pants"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<50; i++){
        Product.create({
          ProductName: "Sweat Pants", 
          Brand: "Patagonia",
          Description: "Comfortable, long pants for chilling or sporting.",  
          Price: 50,
          Images :[{Url:"https://lp2.hm.com/hmgoepprod?set=source[/08/81/0881c663d72d5f5561de3c2a90ec7d8b11e4fe5f.jpg],origin[dam],category[men_trousers_joggers],type[DESCRIPTIVESTILLLIFE],res[s],hmver[1]&call=url[file:/product/main]" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 6,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 60,
            Weight: 1
          },
          {
            Size: "M",
            QuantityOnStock: 5,
            Weight: 1
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Pants",
      SubCategories:[{ SubCategoryName: "Leggings"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<50; i++){
        Product.create({
          ProductName: "Leggings", 
          Brand: "H&M",
          Description: "Elastic pants for chilling or sporting",  
          Price: 25,
          Images :[{Url:"https://images-na.ssl-images-amazon.com/images/I/715dGYq1QuL._UL1500_.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 7,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 100,
            Weight: 1
          },
          {
            Size: "M",
            QuantityOnStock: 50,
            Weight: 1
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Shoes",
      SubCategories:[{ SubCategoryName: "Business Shoes"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<30; i++){
        Product.create({
          ProductName: "Business Shoes", 
          Brand: "Oxfords",
          Description: "Comfortable, long pants for chilling or sporting.",  
          Price: 150,
          Images :[{Url:"https://ae01.alicdn.com/kf/HTB1SOu2aMmTBuNjy1Xbq6yMrVXaj/Fashion-Black-brown-tan-oxfords-shoes-mens-dress-shoes-genuine-leather-formal-wedding-shoes-mens-business.jpg_640x640.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 8,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 32,
            Weight: 2
          },
          {
            Size: "M",
            QuantityOnStock: 57,
            Weight: 2
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Shoes",
      SubCategories:[{ SubCategoryName: "Boots"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<50; i++){
        Product.create({
          ProductName: "Boots", 
          Brand: "Timberlands",
          Description: "Big, protective Shoes",  
          Price: 100,
          Images :[{Url:"https://slimages.macysassets.com/is/image/MCY/products/8/optimized/1321388_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 9,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 71,
            Weight: 3
          },
          {
            Size: "M",
            QuantityOnStock: 58,
            Weight: 3
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Tops",
      SubCategories:[{ SubCategoryName: "T-shirts"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<20; i++){
        Product.create({
          ProductName: "T-shirt", 
          Brand: "H&M",
          Description: "Generic, plain shirt for everday activities",  
          Price: 10,
          Images :[{Url:"https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C61a1a2QNTTL.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UX522_.png" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 10,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 200,
            Weight: .75
          },
          {
            Size: "M",
            QuantityOnStock: 46,
            Weight: 0.5
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Tops",
      SubCategories:[{ SubCategoryName: "Sweater"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<5; i++){
        Product.create({
          ProductName: "Sweater", 
          Brand: "Ralph Lauren",
          Description: "Nice, warm, wool sweater",  
          Price: 60,
          Images :[{Url:"https://cdn.lookastic.co.uk/grey-cable-sweater/plus-cable-knit-wool-sweater-original-800753.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 11,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 97,
            Weight: 2
          },
          {
            Size: "M",
            QuantityOnStock: 23,
            Weight: 2
          }]
        },{
          include: ['Images','Quantities']
        })
        .then(product =>{
          // console.log(product);
        })
      }
  }).then(result =>{
    Categories.create({
      CategoryName: "Tops",
      SubCategories:[{ SubCategoryName: "Hoodie"}]
    },{
      include: ['SubCategories']
    }).then(result=>{
      for(i=0; i<30; i++){
        Product.create({
          ProductName: "Hoodie", 
          Brand: "H&M",
          Description: "Warm jumper with a hood and pockets",  
          Price: 30,
          Images :[{Url:"https://images-na.ssl-images-amazon.com/images/I/61OTb9yqS8L._UY445_.jpg" }],
        // Reviews : [{
        //   CustomerName : "Donis",
        //   Score : 5,
        //   ReviewText : "Amazing pants very good."
        // }],
          SubCategoryID : 12,
          Quantities: [{
            Size: "L",
            QuantityOnStock: 63,
            Weight: 1
          },
          {
            Size: "M",
            QuantityOnStock: 23,
            Weight: 1
          }]
        },{
          include: ['Images','Quantities']
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
  


})
})
})
})
})
})
})
})
})
})
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

<<<<<<< Updated upstream

=======
// sequelize.query('DROP PROC IF EXISTS UpdateQuantity;');
// sequelize.query(`
//   CREATE PROC UpdateQuantity (@qnt INT, @ProductID INT, @Size VARCHAR(50))
//   AS
//   BEGIN
//   DECLARE @quantity INT = (SELECT QuantityOnStock FROM dbo.quantities WHERE ProductID = @ProductID AND Size = @Size )
//   IF @quantity > @qnt
//     UPDATE dbo.quantities
//     SET QuantityOnStock = QuantityOnStock - @qnt ,SoldQuantity = SoldQuantity + @qnt
//     WHERE ProductID = @ProductID AND Size = @Size
//   ELSE
//     RAISERROR ('No enough products in storage', 16, 1);
//   END
// `).then(() =>console.log("Procedure created")); 
>>>>>>> Stashed changes
