var expect = require('chai').expect;
var jwt = require('jsonwebtoken');
var request = require('request');
var expressJwt = require('express-jwt');

var app = require('../../server/app.js');
var db = require('../../server/db/db');
var User = require('../../server/db/user/user');
var Product = require('../../server/db/product/product');
var utils = require('../../server/utils/utils.js');
var port = process.env.PORT || 8080;

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and describe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
var xbeforeEach = function(){};
/************************************************************/


describe('', function() {
  
  before(function (done) {
    app.listen(port, function (err, result) {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  describe('User authentication', function () {

    var options = {
      'method': 'POST',
      'followAllRedirects': true,
      'uri': `http://localhost:${port}/auth/login`,
      'json': {
        'username': 'Phillip',
        'password': 'Phillip'
      }
    };  
    
    before(function (done) {
      User.find({}).then(function (docs) {
          docs.forEach(function (doc) {
            doc.remove().then(function () {
            });
          });
        }).catch(function (err) {
          done(err);
          throw {
            type: 'DatabaseError',
            message: 'Failed to clear User Colletion'
          };
        }).then(function () {
          new User({
              'username': 'Phillip',
              'password': 'Phillip',
              'displayName': 'Phillip',
              'email': 'test@test.com'
          }).save().then(function(){
            done();
          }).catch(function (err) {
            done(err);
            throw {
              type: 'DatabaseError',
              message: 'Failed to save new User'
            };
          });  
        });
    });

    it('Login with Existing User Data', function (done) {
      request(options, function (err, res, body) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
    });
    
    it('Signup with new User', function (done) {
      request(options, function (err, res, body) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
    });
    
    it('Verify User with HTTP Request Header contains JWT data', function (done) {
      var options2 = {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + 'incorrectToken'
        },
        'followAllRedirects': true,
        'uri': `http://localhost:${port}/products`,
        'json': {
          type: 'tool',
          title: 'Testing tool',
          description: 'description',
          price: 15,
          author: 'author'
        }
      };
      
      request(options2, function (err, res, body) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(401);
        done();
      })
    });
    
    it('Reject with 401 code if User try to login with Wrong password', function (done) {
      var options2 = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': `http://localhost:${port}/auth/login`,
        'json': {
          'username': 'Phillip',
          'password': 'wrongPwd'
        }
      };  
      request(options2, function (err, res, body) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
  });
});



  // describe('Product creation:', function(){
    
  //   // var requestWithSession = request.defaults({jar: true});

  //   beforeEach(function(done){      // create a user that we can then log-in with

  //   });

  //   it('Only shortens valid urls, returning a 404 - Not found for invalid urls', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/links',
  //       'json': {
  //         'url': 'definitely not a valid url'
  //       }
  //     };

  //     requestWithSession(options, function(error, res, body) {
  //       // res comes from the request module, and may not follow express conventions
  //       expect(res.statusCode).to.equal(404);
  //       done();
  //     });
  //   });

  //   describe('Shortening links:', function(){

  //     var options = {
  //       'method': 'POST',
  //       'followAllRedirects': true,
  //       'uri': 'http://127.0.0.1:4568/links',
  //       'json': {
  //         'url': 'http://roflzoo.com/'
  //       }
  //     };

  //     it('Responds with the short code', function(done) {
  //       requestWithSession(options, function(error, res, body) {
  //         expect(res.body.url).to.equal('http://roflzoo.com/');
  //         expect(res.body.code).to.not.be.null;
  //         done();
  //       });
  //     });

  //     it('New links create a database entry', function(done) {
  //       requestWithSession(options, function(error, res, body) {
  //         db.knex('urls')
  //           .where('url', '=', 'http://roflzoo.com/')
  //           .then(function(urls) {
  //             if (urls['0'] && urls['0']['url']) {
  //               var foundUrl = urls['0']['url'];
  //             }
  //             expect(foundUrl).to.equal('http://roflzoo.com/');
  //             done();
  //           });
  //       });
  //     });

  //     it('Fetches the link url title', function (done) {
  //       requestWithSession(options, function(error, res, body) {
  //         db.knex('urls')
  //           .where('title', '=', 'Funny pictures of animals, funny dog pictures')
  //           .then(function(urls) {
  //             if (urls['0'] && urls['0']['title']) {
  //               var foundTitle = urls['0']['title'];
  //             }
  //             expect(foundTitle).to.equal('Funny pictures of animals, funny dog pictures');
  //             done();
  //           });
  //       });
  //     });

  //   }); // 'Shortening links'

  //   describe('With previously saved urls:', function(){

  //     var link;

  //     beforeEach(function(done){
  //       // save a link to the database
  //       link = new Link({
  //         url: 'http://roflzoo.com/',
  //         title: 'Funny pictures of animals, funny dog pictures',
  //         base_url: 'http://127.0.0.1:4568'
  //       });
  //       link.save().then(function(){
  //         done();
  //       });
  //     });

  //     it('Returns the same shortened code', function(done) {
  //       var options = {
  //         'method': 'POST',
  //         'followAllRedirects': true,
  //         'uri': 'http://127.0.0.1:4568/links',
  //         'json': {
  //           'url': 'http://roflzoo.com/'
  //         }
  //       };

  //       requestWithSession(options, function(error, res, body) {
  //         var code = res.body.code;
  //         expect(code).to.equal(link.get('code'));
  //         done();
  //       });
  //     });

  //     it('Shortcode redirects to correct url', function(done) {
  //       var options = {
  //         'method': 'GET',
  //         'uri': 'http://127.0.0.1:4568/' + link.get('code')
  //       };

  //       requestWithSession(options, function(error, res, body) {
  //         var currentLocation = res.request.href;
  //         expect(currentLocation).to.equal('http://roflzoo.com/');
  //         done();
  //       });
  //     });

  //     it('Returns all of the links to display on the links page', function(done) {
  //       var options = {
  //         'method': 'GET',
  //         'uri': 'http://127.0.0.1:4568/links'
  //       };

  //       requestWithSession(options, function(error, res, body) {
  //         expect(body).to.include('"title":"Funny pictures of animals, funny dog pictures"');
  //         expect(body).to.include('"code":"' + link.get('code') + '"');
  //         done();
  //       });
  //     });

  //   }); // 'With previously saved urls'

  // }); // 'Link creation'

  // describe('Privileged Access:', function(){

  //   it('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  //   it('Redirects to login page if a user tries to create a link and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/create', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  //   it('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
  //     request('http://127.0.0.1:4568/links', function(error, res, body) {
  //       expect(res.req.path).to.equal('/login');
  //       done();
  //     });
  //   });

  // }); // 'Priviledged Access'

  // describe('Account Creation:', function(){

  //   it('Signup creates a user record', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/signup',
  //       'json': {
  //         'username': 'Svnh',
  //         'password': 'Svnh'
  //       }
  //     };

  //     request(options, function(error, res, body) {
  //       db.knex('users')
  //         .where('username', '=', 'Svnh')
  //         .then(function(res) {
  //           if (res[0] && res[0]['username']) {
  //             var user = res[0]['username'];
  //           }
  //           expect(user).to.equal('Svnh');
  //           done();
  //         }).catch(function(err) {
  //           throw {
  //             type: 'DatabaseError',
  //             message: 'Failed to create test setup data'
  //           };
  //         });
  //     });
  //   });

  //   it('Signup logs in a new user', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/signup',
  //       'json': {
  //         'username': 'Phillip',
  //         'password': 'Phillip'
  //       }
  //     };

  //     request(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/');
  //       done();
  //     });
  //   });

  // }); // 'Account Creation'

  // describe('Account Login:', function(){

  //   var requestWithSession = request.defaults({jar: true});

  //   beforeEach(function(done){
  //     new User({
  //         'username': 'Phillip',
  //         'password': 'Phillip'
  //     }).save().then(function(){
  //       done()
  //     });
  //   })

  //   it('Logs in existing users', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/login',
  //       'json': {
  //         'username': 'Phillip',
  //         'password': 'Phillip'
  //       }
  //     };

  //     requestWithSession(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/');
  //       done();
  //     });
  //   });

  //   it('Users that do not exist are kept on login page', function(done) {
  //     var options = {
  //       'method': 'POST',
  //       'uri': 'http://127.0.0.1:4568/login',
  //       'json': {
  //         'username': 'Fred',
  //         'password': 'Fred'
  //       }
  //     };

  //     requestWithSession(options, function(error, res, body) {
  //       expect(res.headers.location).to.equal('/signup');
  //       done();
  //     });
  //   });

  // }); // 'Account Login'

