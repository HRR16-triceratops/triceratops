var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var Product = require("../../db/product/product.js");
var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var secret = process.env.JWT_SECRET || 'sleepingpuppies';

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
    res.status(404).send('DatabaseError');
  })
});

/**
 *  Request Handler for POST(create) Method with JWT verification middleware
 *  @expected data with Req - Complete product data(type, title, description, price, locationInfo, author)
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 *  @return {Object} - contains every data including timestamps, ObjectId, isActivated
 */
 // take out: middleware!  expressJwt({secret: secret})
// router.post('/', expressJwt({secret: secret}) ,function(req, res){
router.post('/', function(req, res){
  console.log("=======PUT products/post is being handled! ==========")
  var prod = req.body;
  console.log(req.body.type); 
  console.log('======================');
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
    res.send(doc);
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('DatabaseError');
  });
});

/**
 *  Request Handler for PUT(update) Method with JWT verification middleware
 *  @expected data with Req - 1. ObjectId as parameter(req.params.id)
 *                            2. Complete product data including the field need to be updated(req.body)
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 */
router.put('/:id', expressJwt({secret: secret}), function(req, res){
  var id = req.params.id;
  var prod = req.body;
  Product.findByIdAndUpdate(id, prod).then(function (doc) {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('DatabaseError');
  });
});

module.exports = router;