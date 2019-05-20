const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/user');
var Sequelize = require("sequelize");
const Images = require('../models/image');
const middleware = require('../middleware/auth');
const SubCategories = require('../models/subcategories');

router.get('/', (req, res, next) => {
  res.redirect('/products');
});

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

router.get('/products/:category/:subCategory', (req, res, next) => {
  const PRODUCT_CATEGORY = req.params.category;
  const SUB_CATEGORY = req.params.subCategory;
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);

  Product.count({
    include:[{
      model : SubCategories,
      as : 'SubCategory',
      where : { SubCategoryName: SUB_CATEGORY }
    }]
  }).then(result => {
    totalItems = result;
    return Product.findAll({
      attributes: ['ProductID', 'ProductName','Price'],
      include: [ {
        model : Images,
        as : 'Images'   
      },{
        model : SubCategories,
        where : {SubCategoryName: SUB_CATEGORY },
        as :'SubCategory'
      }
      ],
      offset: (pageIndex - 1) * itemsPerPage,
      limit: itemsPerPage
    })
  }).then(result =>{
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
});

router.get('/products/:category', (req, res, next) => {
  const PRODUCT_CATEGORY = req.params.category
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);
  
  Product.count({
    where: {
      Category: PRODUCT_CATEGORY
    }
  }).then(result => {
    totalItems = result;
    return Product.findAll({
      attributes: ['ProductID', 'ProductName','Price'],
      include: [
        'images'
      ],
      where: {
        Category: PRODUCT_CATEGORY
      },
      offset: (pageIndex - 1) * itemsPerPage,
      limit: itemsPerPage
    })
  }).then(result =>{
    res.render('products', {
      "products": result,
      currentPage: pageIndex,
      hasNextPage: itemsPerPage * pageIndex < totalItems,
      hasPreviousPage: pageIndex > 1,
      nextPage: pageIndex + 1,
      previousPage: pageIndex - 1,
      lastPage: Math.ceil(totalItems / itemsPerPage) 
    } );
  });
});
router.post('/products/addtocart/:id', (req, res, next) => {
  const id = req.params.id
  Product.find({
    where: { ProjectID : id },
    attributes: ['ProductID', 'ProductName', 'Price'],
    include: [
      'images'
    ]
  }).then(product =>{
    product.Quantity = 1;
    if(!req.cookies.cart) req.cookies.cart = []
    let cartCookie = req.cookies.cart
    let el = cartCookie.find(item=>{
      if(item.ProductID == product.ProductID){
        item.Quantity = item.Quantity + 1
        return item
      }   
    });
    if(!el){
      cartCookie.push(product)
    }
    res.cookie('cart', cartCookie)
    res.redirect('/user/cart/');
  })
})

router.get('/product/:id', (req, res, next) => {
  const id = req.params.id;
  Product.findAll({
    include: [
      'images',
      'reviews'
    ],
    where: {
      ProductID: id
    }
  }).then(result =>{
    res.render('product-detail', { "product": result } );
    // res.send(result);
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





router.get('/user/profile', middleware.isLoggedIn,  (req, res, next) => {
  const userID  = req.user.UserID
  User.findByPk(userID).then(user => {
    res.render('profile', {user :user});
  }).catch(err => next(err));
});

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

router.get('/register', (req, res, next) => {
  res.render('register');
});
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.get("/logout", middleware.Logout);
router.post("/login", middleware.Login);

router.get('/checkout', (req, res, next) => {
  res.send("works")
});
module.exports = router;