var mongoose = require('mongoose');
//mongoose-type-url allows you to specify a URL type in the schema that will 
//validate the URL being saved to the db - https://www.npmjs.com/package/mongoose-type-url
require('mongoose-type-url');

// Connect to Heroku db or local DB as deaults
var url = process.env.MONGODB_URI || 'mongodb://localhost/shareanything';

// Connect to mongo db
mongoose.connect(url);

// Log the db connection status
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected!');
});

module.exports = mongoose;
