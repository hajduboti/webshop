const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/user');
var Sequelize = require("sequelize");
const Images = require('../models/image');
const middleware = require('../middleware/auth');
const SubCategories = require('../models/subcategories');
const redis = require('../redis'); 

router.get('/', (req, res, next) => {
  res.redirect('/products');
});

///===============================
////     FIND BY PRODUCT NAME
///===============================

router.post('/products/find', (req, res, next) => {
  const productName = req.body.ProductName;
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
      attributes: ['ProductID', 'ProductName','Price'],
      include: [
        'Images'
      ],
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
          attributes: ['ProductID', 'ProductName', 'Price'],
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
  const id = req.params.id
  Product.findOne({
    where: { ProductID: id },
    attributes: ['ProductID', 'ProductName', 'Price'],
    include: [
      'Images'
    ],
    raw: true
  }).then(product => {
    if (!req.cookies.cart) req.cookies.cart = []
    let cartCookie = req.cookies.cart
    let el = cartCookie.find(item => {
      if (item.ProductID == product.ProductID) {
        item.Quantity = item.Quantity + 1
        return item
      }
    });
    if (!el) {
      product.Quantity = 1;
      cartCookie.push(product)
    }
    res.cookie('cart', cartCookie)
    res.redirect('/user/cart/');
  })
})

///===============================
////     FIND BY PRODUCT ID
///===============================

router.get('/product/:id', (req, res, next) => {
  const id = req.params.id;
  Product.findAll({
    include: [
      'Images',
      'Reviews'
    ],
    where: {
      ProductID: id
    }
  }).then(result => {
    res.render('product-detail', { "product": result });
  });
});

router.get('/user/cart/', (req, res, next) => {
  res.send(JSON.stringify(req.cookies));
  // res.render('cart');
});

router.get('/user/orders/', (req, res, next) => {
  res.render('cart');
});

router.get('/admin/orders', (req, res, next) => {
  res.render('orders');
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

router.get('/checkout', (req, res, next) => {
  let cart = [{
    ProductID : 1,
    Quantity :1
  }]

  res.send("works")
});

module.exports = router;