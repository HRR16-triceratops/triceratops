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
  imgURL: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  summary: {
    type: String,
    maxlength: 200,
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
    type: String, // username
    required: true
  },
  rentSchedule: [ // store multiple rentSchedule
    {
      username: {
        type: String, // username who rent this item
        required: true
      },
      from: {
        type: String, // 'YYYY-MM-DD'
        required: true
      },
      to: {
        type: String,
        required: true
      }
    }
  ],
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
  },

  rentalUpdate: function rentalUpdate (update) {
    if (update.username !== undefined){
      this.rentSchedule[0] = {
        username: update.username,
        from: "available",
        to: "available"
      };
      return this;
    } else {
      console.log("rentalUpdate method on Model is dealing with a username set in obj, i.e a removal request!");
      console.log('but currently only throws error?');
      throw err;
    }
  }
};

module.exports = mongoose.model('products', ProductSchema);
