var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var Product = require("../../db/product/product.js");
var express = require('express');
var router = express.Router();

/**
 *  Request Handler for GET(read) Method
 *  @expected data with Req - nothing
 *  @return {Array} - Array of every product Object
 */
router.get('/', function(req, res){
  Product.find({}).then(function (docs) {
    res.send(docs);
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  })
});

/**
 *  Request Handler for POST(create) Method
 *  @expected data with Req - Complete product data(type, title, description, price, locationInfo, author)
 *  @return {Object} - contains every data including timestamps, ObjectId, isActivated
 */
router.post('/', function(req, res){
  var prod = req.body;
  var newProduct = new Product({
    type: prod.type,
    title: prod.title,
    description: prod.description,
    price: prod.price,
    locationInfo: prod.locationInfo,
    author: prod.author,
    isActivated: true
  });
  
  newProduct.save().then(function (doc) {
    res.send(doc).catch(function (err) {
      console.log(err);
      res.status(404).send('weird....');
    });
  })
});

/**
 *  Request Handler for PUT(update) Method
 *  @expected data with Req - 1. ObjectId as parameter(req.params.id)
 *                            2. Complete product data including the field need to be updated(req.body)
 */
router.put('/:id', function(req, res){
  var id = req.params.id;
  var prod = req.body;
  Product.findByIdAndUpdate(id, prod).then(function (doc) {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

module.exports = router;