var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var morgan = require('morgan');
var auth = require('./routes/auth/auth.js');
var profile = require('./routes/profile/profile.js');
var products = require('./routes/products/products.js');

var app = express();

app.use(express.static('./build')); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('hot-tub-tonight!'));
app.use(session({
  secret: "triceratops-pillows",
  cookie: { maxAge: 60 *1000},
  resave: true,
  saveUninitialized: true
}));


//Router
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/products', products);
app.use('/*', products);

exports.app = app;