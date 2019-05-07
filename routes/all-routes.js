const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/products');
});

router.get('/products/', (req, res, next) => {
  res.render('products');
});

router.get('/products/:id', (req, res, next) => {
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