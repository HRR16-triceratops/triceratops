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
  comments: [
    {
      author: String,
      content: String,
      date: Date
    }
  ],
  price: {
    type: Number,
    required: true
  },
  availableFrom: {
    type: String,
    required: true
  },
  availableTo: {
    type: String,
    required: true
  },
  locationInfo: {
    address: String,
    marker: {
      lat: {
        type: Number,
        require: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  author: {
    username: {
      type: String, // username
      required: true
    },
    displayName: {
      type: String,
      required: true
    }
  },
  rentSchedule: [ // store multiple rentSchedule
    {
      username: {
        type: String, // username who rent this item
        required: true
      },
      date: {
        type: String, // 'YYYY-MM-DD'
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

  /**
  * rentalUpdate(update) =>
  *  @param update: {Object} - contain username, rent date
  *  @return {object} - model instance of Product with updated rentSchedule.
  *                     simply chain .save() to save it to DB
  */
  rentalUpdate: function rentalUpdate (update) {
    if (update._id === undefined){
      this.rentSchedule.push({
        username: update.username,
        date: update.date
      });
      return this;
    } else {
      this.rentSchedule = this.rentSchedule.filter(function(schedule) {
        return schedule._id.toString() !== update._id;
      });
      return this;
    }
  },

  /**
  * addComment(update) =>
  *  @param update: {Object} - contain author, content, and date
  *  @return {object} - model instance of Product with updated rentSchedule.
  *                     simply chain .save() to save it to DB
  */
  addComment: function addComment (update) {
    this.comments.push({
      author: update.author,
      date: update.date,
      content: update.content
    });
    return this;
  }
};

module.exports = mongoose.model('products', ProductSchema);
