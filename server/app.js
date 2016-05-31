var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var morgan = require('morgan');
var auth = require('./routes/auth/auth.js');
var profile = require('./routes/profile/profile.js');
var products = require('./routes/products/products.js');

var app = express();

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'triceratops-pillows',
  cookie: { maxAge: 60 *1000},
  resave: true,
  saveUninitialized: true
}));


//Router
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/products', products);
app.use('/*', function (req, res) {
  res.redirect('/');
});

module.exports = app;
