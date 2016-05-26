// import DB
// import Product model
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var Product = require("../../db/product/product.js");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  Product.find({}).then(function (docs) {
    res.send(docs);
  })
});

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
    console.log('doc saved', doc);
    res.send({
      data: doc,
      message: 'New Product Created'
    }).catch(function (err) {
      console.log(err);
    })
  })
});

router.put('/:id', function(req, res){
  var id = req.params.id;
  var prod = req.body;
  Product.findByIdAndUpdate(id, prod).then(function (doc) {
    console.log(doc);
    res.send(doc);
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});


// create helper method
  // get all listing
  // delete(deactivate) listing - should be synced with User model
  // post new listing - should be synced with User model
  
// export router
module.exports = router;