var mongoose = require('../db.js');

var Schema = mongoose.Schema;

//create schema for Product
var ProductSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  locationInfo: Object,
  author: {
    type: String,
    required: true
  },
  isActivated: Boolean
}, {
  timestamps: true
});

ProductSchema.methods = {

  /**
   * toggleActivation() =>
   *  @return {object} - model instance of Product with toggled 'isActivated' key.
   *                     simply chain .save() to save it to DB
   */
  toggleActivation: function toggleActivation () {
    this.isActivated = !this.isActivated;
    return this;
  }
};


module.exports = mongoose.model('products', ProductSchema);
