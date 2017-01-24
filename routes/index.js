var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, data){
    var chunks = [];
    var chunksize = 3; // col-md-4 fits with 3
    for(var i=0; i < data.length; i += chunksize){
      chunks.push(data.slice(i, i + chunksize));
    }
    res.render('index', { title: 'Shopping cart', products: chunks });
  });  
});

module.exports = router;
