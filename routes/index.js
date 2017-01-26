var express = require('express');
var router = express.Router();
var csrf = require('csurf'); // CSRF token middleware
var passport = require('passport');

var Cart = require('../models/cart');
var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection); // all routes by managed this router should use csrfProtection

/* GET home page. */
router.get('/', function(req, res, next) {
  var shoppinglist = null;
  var totalPrice = 0;
  
  if(req.session.cart) {
    var cart = new Cart(req.session.cart);
    shoppinglist = cart.generateArray();
    totalPrice = cart.totalPrice;
  }    

  Product.find(function(err, data){
    var chunks = [];
    var chunksize = 3; // col-md-4 fits with 3
    for(var i=0; i < data.length; i += chunksize){
      chunks.push(data.slice(i, i + chunksize));
    }
    res.render('index', { title: 'Shopping cart', products: chunks, list: shoppinglist, totalPrice: totalPrice });
  });  
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id; // get productid from request parameters
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} }); // if cart is empty, create an empty cart

  Product.findById(productId, function(err, product){
    if(err) return res.redirect('/');
    cart.add(product, product.id); // add product to cart
    req.session.cart = cart; // store cart in the cookie
    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduce(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart) return res.render('shop/shopping-cart', {products: null});
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

module.exports = router;