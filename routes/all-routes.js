const express = require('express');
const router = express.Router();
const Product = require('../models/products');
var Sequelize = require("sequelize");
const Images = require('../models/image');

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
        'images'
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
  const PRODUCT_NAME = req.params.subCategory;
  let pageIndex = 1;
  const itemsPerPage = 20;
  if (req.query.page) pageIndex = parseInt(req.query.page);

  Product.count({
    where: {
      Category: PRODUCT_CATEGORY,
      SubCategory: PRODUCT_NAME
    }
  }).then(result => {
    totalItems = result;
    return Product.findAll({
      attributes: ['ProductID', 'ProductName','Price'],
      include: [
        'images'
      ],
      where: {
        Category: PRODUCT_CATEGORY,
        SubCategory: PRODUCT_NAME
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
  res.render('cart');
});

router.get('/user/orders/', (req, res, next) => {
  res.render('cart');
});

router.get('/admin/orders', (req, res, next) => {
  res.render('orders');
});


module.exports = router;