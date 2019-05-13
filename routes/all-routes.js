const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.get('/', (req, res, next) => {
  res.redirect('/products');
});

router.get('/products/', (req, res, next) => {
  res.render('products');
});

router.get('/products/:category/:subCategory', (req, res, next) => {
  console.log(req.params.category)
  console.log(req.params.subCategory)

  PRODUCT_CATEGORY = req.params.category
  PRODUCT_NAME = req.params.subCategory

const products = [
  Product.findAll({
    attributes: ['ProductID', 'ProductName','Price' ],

    where: {
      category: PRODUCT_CATEGORY,
      ProductName: PRODUCT_NAME
    }
  }).then(result =>{
    console.log(result)
  })
]


  // const products = [{
  //   ProductID : 1,
  //   ProductName: "Addidas yeezy",
  //   Price : 200.00,
  //   Images: ["/assets/images/gallery/chair.jpg"]
  // },
  // {
  //   ProductID : 2,
  //   ProductName: "Addidas yeezy2",
  //   Price : 100.00,
  //   Images: ["/assets/images/gallery/chair.jpg"]
  // }]
  res.render('products', {"products": products } );
});

router.get('/products/:category', (req, res, next) => {
  console.log(req.params.category)
  res.render('products');
});


router.get('/product/:id', (req, res, next) => {
  console.log(req.params.id);
  res.render('product-detail');
});

router.get('/user/cart/', (req, res, next) => {
  res.render('cart');
});

router.get('/user/orders/', (req, res, next) => {
  res.render('cart');
});

router.get('/admin/orders', (req, res, next) => {
  res.render('orders');
});


module.exports = router;