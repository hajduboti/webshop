const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = require('../mssql');

const middleware = require('../middleware/auth');
const redis = require('../redis'); 
///===============================
////     MODELS
///===============================

const Images = require('../models/image');
const Product = require('../models/products');
const User = require('../models/user');
const Order = require('../models/order');
const OrderItems = require('../models/orderitems');
const SubCategories = require('../models/subcategories');
const Quantities = require('../models/quantities');
const Reviews = require('../models/reviews');

router.get('/', (req, res, next) => {
  res.redirect('/products');
});

///===============================
////     FIND BY PRODUCT NAME
///===============================

router.get('/products/find/:ProductName', (req, res, next) => {
  const productName = req.params.ProductName;
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);

  Product.count({
    where: { 
      ProductName: {
        [Sequelize.Op.like]: '%'+productName+'%'
      }
    }
  }).then(count =>{
    totalItems = count;
    return Product.findAll({
      attributes: ['ProductID', 'ProductName','Price'],
      include: [
        'Images'
      ],
      where: { 
        ProductName: {
          [Sequelize.Op.like]: '%'+productName+'%'
        }
      },
      offset: (pageIndex - 1) * itemsPerPage,
      limit: itemsPerPage
    })
  }).then(result =>{
    res.render('products',{
      products : result,
      currentPage: pageIndex,
      hasNextPage: itemsPerPage * pageIndex < totalItems,
      hasPreviousPage: pageIndex > 1,
      nextPage: pageIndex + 1,
      previousPage: pageIndex - 1,
      lastPage: Math.ceil(totalItems / itemsPerPage) 
    });
  })
});

///===============================
////     FIND ALL PRODUCTS
///===============================

router.get('/products/', (req, res, next) => {
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);

  Product.count().then(result => {
    totalItems = result;
    return Product.findAll({
      attributes: ['ProductID', 'ProductName','Price','Score'],
      include: [
        'Images'
      ],
      offset: (pageIndex - 1) * itemsPerPage,
      limit: itemsPerPage
    })
  }).then(result =>{
    res.render('products', {
      products : result,
      currentPage: pageIndex,
      hasNextPage: itemsPerPage * pageIndex < totalItems,
      hasPreviousPage: pageIndex > 1,
      nextPage: pageIndex + 1,
      previousPage: pageIndex - 1,
      lastPage: Math.ceil(totalItems / itemsPerPage) 
    });
  });
});

///===============================
////     FIND BY SUB_CATEGORY
///===============================

router.get('/products/:category/:subCategory', (req, res, next) => {
  const SUB_CATEGORY = req.params.subCategory;
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);
  const redisKey = SUB_CATEGORY + '&page=' + pageIndex
  redis.getAsync(redisKey).then(function(result) {
    if(result){
      console.log("response from redis")
      const redisResponse = JSON.parse(result)
      const totalItems = redisResponse.totalItems;
      res.render('products', {
        products: redisResponse.result ,
        currentPage: pageIndex,
        hasNextPage: itemsPerPage * pageIndex < totalItems,
        hasPreviousPage: pageIndex > 1,
        nextPage: pageIndex + 1,
        previousPage: pageIndex - 1,
        lastPage: Math.ceil(totalItems / itemsPerPage)
      });
    } else {
      console.log("response from MSSQL")
      SubCategories.findOne({
        where: { SubCategoryName: SUB_CATEGORY }
      })
      .then(subCategory => {
        let id = subCategory.SubCategoryID
        return Product.count({
          where: { SubCategoryID: id }
        })
      })
      .then(result => {
        totalItems = result;
        return Product.findAll({
          attributes: ['ProductID', 'ProductName', 'Price', 'Score'],
          include: [
            {
              model: Images,
              as: 'Images'
            },
            {
              model: SubCategories,
              where: { SubCategoryName: SUB_CATEGORY },
              as: 'SubCategory'
            }
          ],
          offset: (pageIndex - 1) * itemsPerPage,
          limit: itemsPerPage
        })
      })
      .then(result => {
        redis.set(redisKey, JSON.stringify({result:result,totalItems:totalItems}) , 'EX', 60);
        res.render('products', {
          "products": result,
          currentPage: pageIndex,
          hasNextPage: itemsPerPage * pageIndex < totalItems,
          hasPreviousPage: pageIndex > 1,
          nextPage: pageIndex + 1,
          previousPage: pageIndex - 1,
          lastPage: Math.ceil(totalItems / itemsPerPage)
        });
      });
    }
  }); 
});

///===============================
////     ADD TO CART
///===============================

router.post('/products/addtocart/:id', (req, res, next) => {
  const size = req.query.size
  const id = req.params.id
  Product.findOne({
    where: { ProductID: id },
    attributes: ['ProductID', 'ProductName', 'Price'],
    include: [
      {
        model: Images,
        as: 'Images',
        attributes: ['Url']
      },
      {
        model: Quantities,
        as: 'Quantities',
        where: { Size: size },
        attributes: ['Size', 'Weight','ProductQuantityID']
      }
    ],
    raw: true
  }).then(product => {
    if (!req.cookies.cart) req.cookies.cart = []
    let cartCookie = req.cookies.cart
    let el = cartCookie.find(item => {
      if (item.ProductID == product.ProductID && item['Quantities.Size'] == product['Quantities.Size']  ) {
        item.Quantity = item.Quantity + 1
        return item
      }
    });
    if (!el) {
      product.Quantity = 1;
      cartCookie.push(product)
    }
    let totalPrice = 0;
    cartCookie.map(element =>{
      let price = element.Quantity * element.Price;
      totalPrice += price
    })
    res.cookie('cart', cartCookie)
    res.cookie('totalPrice', totalPrice)
    res.sendStatus(200);
  })
})

///===============================
////     FIND BY PRODUCT ID
///===============================

router.get('/product/:id', (req, res, next) => {
  const id = req.params.id;
  Product.findAll({
    include: [
      {
        model: Reviews,
        as: 'Reviews'
      },
      {
        model: Images,
        as: 'Images'
      },
      {
        model: Quantities,
        as: 'Quantities'
      }
    ],
    where: {
      ProductID: id
    }
  }).then(result => {
    // res.json(result)
    res.render('product-detail', { "product": result, logedin : req.isAuthenticated() });
  });
});

router.get('/user/cart/', (req, res, next) => {
  const cart  = req.cookies.cart;
  const totalPrice = req.cookies.totalPrice;
  res.render('cart',{
    cart : cart,
    totalPrice: totalPrice
  });
});

router.get('/user/orders/',middleware.isLoggedIn, (req, res, next) => {
  Order.findAll({
   include:['OrderItems'],
   where :{
     UserID : req.user.UserID
   }
  }).then(result =>{
    res.json(result)
  })
});


///===============================
////     GET USER PROFILE
///===============================

router.get('/user/profile', middleware.isLoggedIn,  (req, res, next) => {
  const userID  = req.user.UserID
  User.findByPk(userID).then(user => {
    res.render('profile', {user :user});
  }).catch(err => next(err));
});

///===============================
////     UPDATE USER PROFILE
///===============================

router.put("/user/profile", middleware.isLoggedIn,  (req, res, next) => {
  const body = req.body;
  const userID  = req.user.UserID
  User.findByPk(userID).then(user => {
    return user.update(body)
  }).then(()=>{
    res.redirect('/user/profile');
  })
  .catch(err => next(err));
});

///===============================
////     ADD REVIEW
///===============================

router.post("/product/:id",middleware.isLoggedIn, (req, res, next) => {
  const productID = req.params.id;
  let body = req.body;
  body.CustomerName = req.user.FirstName
  body.ProductID = productID;
  Reviews.create(body).then(result =>{
    console.log(result);
    res.redirect('./'+productID);
  }).catch(err =>next(err))
})

///===============================
////     SIGN UP
///===============================

router.post('/register', (req, res, next) => {
  const body = req.body;
  User.create(body).then(user =>{
    req.login(user, function (err) {
      if ( ! err ){
        res.redirect('/');
      } else {
        next(err)
      }
    })
  }).catch(err => next(err))
});

///===============================
////     GET SIGN UP PAGED
///===============================

router.get('/register', (req, res, next) => {
  res.render('register');
});

///===============================
////     GET LOGIN PAGE
///===============================

router.get('/login', (req, res, next) => {
  res.render('login');
});

///===============================
////     LOGOUT AND LOGIN
///===============================

router.get("/logout", middleware.Logout);
router.post("/login", middleware.Login);

///===============================
////     SUBMIT CHECKOUT
///===============================

router.post('/user/cart/checkout', middleware.isLoggedIn, (req, res, next) => {
  let totalPrice = req.cookies.totalPrice;
  let orderitems = req.cookies.cart;
  orderitems.map(element=>{
    element.Size = element['Quantities.Size'];
    delete element['Quantities.Size']
    element.Weight = element['Quantities.Weight'];
    // element.Weight = 'asd';
    delete element['Quantities.Weight']
    element.ProductQuantityID = element['Quantities.ProductQuantityID'];
    delete element['Quantities.ProductQuantityID']
    return element;
  })


  sequelize.transaction(
    {isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ},
    (t) => {  
    // chain all your queries here. make sure you return them.
    return Order.create({
      PaymentID: Math.floor(Math.random() * 10000),
      TotalPrice: totalPrice,
      OrderItems: orderitems,
      UserID : req.user.UserID  
    }, {
      include: ['OrderItems'],
      transaction: t
    }).then(result => {
      // Transaction has been committed
      console.log("Transaction has been committed")
      // t.commit()
      res.clearCookie("cart");
      res.clearCookie("totalPrice");
      res.redirect('/user/orders');
    }).catch(err => {
      // Transaction has been rolled back
      throw err;
    });
  }).catch(err => res.status(500).send(err));
});

module.exports = router;