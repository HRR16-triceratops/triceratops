/*eslint-env mocha */
var expect = require('chai').expect;
var request = require('request');

var app = require('../../server/app.js');
var User = require('../../server/db/user/user');
var Product = require('../../server/db/product/product');
var port = process.env.PORT || 8080;


describe('', function() {

  var tokenOfPhillip;
  before(function (done) {
    app.listen(port, function (err) {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  describe('/auth - User authentication', function () {
    var options = {
      'method': 'POST',
      'followAllRedirects': true,
      'uri': 'http://localhost:' + port + '/auth/login',
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
      request(options, function (err, res) {
        if(err) return done(err);
        tokenOfPhillip = res.body.token;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
    });

    it('Signup with new User', function (done) {
      request(options, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
    });

    it('Reject with 401 code if User try to login with Wrong password', function (done) {
      var options2 = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/auth/login',
        'json': {
          'username': 'Phillip',
          'password': 'wrongPwd'
        }
      };
      request(options2, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    it('Verify User with JWT data included in Request Header(Reject Case)', function (done) {
      var options2 = {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + 'incorrectToken'
        },
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/products',
        'json': {
          type: 'tool',
          title: 'Testing tool',
          imgURL: 'https://01.img.society6.com/society6/img/J0f8mnNFknGCucYPzgxLReNrhEk/w_550,h_550/rectangular-pillows/small/front/~artwork/s6-0003/asset_13/302698_1OzFCGmfSi/~~/triceratops-qv5-rectangular-pillows.jpg',
          summary: 'summary',
          description: 'description',
          availableFrom: '2016-06-02T07:00:00.000Z',
          availableTo: '2016-06-32T07:00:00.000Z',
          price: 15,
          author: 'Phillip'
        }
      };
      request(options2, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    it('Verify User with JWT data included in Request Header(Accept Case)', function (done) {
      var options3 = {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + tokenOfPhillip
        },
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/products',
        'json': {
          type: 'tool',
          title: 'Testing tool',
          imgURL: 'https://01.img.society6.com/society6/img/J0f8mnNFknGCucYPzgxLReNrhEk/w_550,h_550/rectangular-pillows/small/front/~artwork/s6-0003/asset_13/302698_1OzFCGmfSi/~~/triceratops-qv5-rectangular-pillows.jpg',
          summary: 'summary',
          description: 'description',
          availableFrom: '2016-06-02T07:00:00.000Z',
          availableTo: '2016-06-32T07:00:00.000Z',
          price: 15,
          author: 'Phillip'
        }
      };
      request(options3, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/products - Product Manipulation', function() {

    var idOfSecondItem;
    var options = {
      'method': 'GET',
      'followAllRedirects': true,
      'uri': 'http://localhost:' + port + '/products'
    };

    before(function (done) {
      Product.find({}).then(function (docs) {
        docs.forEach(function (doc) {
          doc.remove().then(function () {
          });
        });
      }).catch(function (err) {
        done(err);
        throw {
          type: 'DatabaseError',
          message: 'Failed to clear Product Colletion'
        };
      }).then(function () {
        new Product({
          type: 'tool',
          title: 'Testing tool',
          imgURL: 'https://01.img.society6.com/society6/img/J0f8mnNFknGCucYPzgxLReNrhEk/w_550,h_550/rectangular-pillows/small/front/~artwork/s6-0003/asset_13/302698_1OzFCGmfSi/~~/triceratops-qv5-rectangular-pillows.jpg',
          summary: 'summary',
          description: 'description',
          price: 15,
          availableFrom: '2016-06-02T07:00:00.000Z',
          availableTo: '2016-06-32T07:00:00.000Z',
          author: 'Phillip',
          isActivated: true
        }).save().then(function(){
          done();
        }).catch(function (err) {
          done(err);
          throw {
            type: 'DatabaseError',
            message: 'Failed to save new Product'
          };
        });
      });
    });

    it('Should Return List of Product', function (done) {
      request(options, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.have.lengthOf(1);
        done();
      });
    });

    it('Be Able to store new Product', function (done) {
      var options1 = {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + tokenOfPhillip
        },
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/products',
        'json': {
          type: 'tool',
          title: 'new Testing tool',
          imgURL: 'http://rlv.zcache.com/triceratops_dinosaur_accent_pillow-r1453815fd3314238bdb228f7c5a07367_z6i0e_512.jpg?rlvnet=1',
          summary: 'new summary',
          description: 'new description',
          availableFrom: '2016-06-02T07:00:00.000Z',
          availableTo: '2016-06-32T07:00:00.000Z',
          price: 150,
          author: 'Phillip'
        }
      };
      request(options1, function (err) {
        if(err) return done(err);
        request(options, function (err, res) {
          if(err) return done(err);
          var body = JSON.parse(res.body);
          idOfSecondItem = body[1]._id;
          expect(res.statusCode).to.equal(200);
          expect(body).to.have.lengthOf(2);
          expect(body[1]).to.have.property('author');
          done();
        });
      });
    });

    it('Be Able to Update exist Product', function (done) {
      var options1 = {
        'method': 'PUT',
        'headers': {
          'Authorization': 'Bearer ' + tokenOfPhillip
        },
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/products/' + idOfSecondItem,
        'json': {
          type: 'tool',
          title: 'Totally changed title',
          imgURL: 'https://01.img.society6.com/society6/img/7SOHrbrMK1DCZslctHiIIMICPLw/w_550,h_550/rectangular-pillows/small/front/~artwork/s6-0033/a/15468785_15199668/~~/triceratops-triangles-rectangular-pillows.jpg',
          summary: 'Totally changed summary',
          description: 'Totally changed Description',
          availableFrom: '2016-06-02T07:00:00.000Z',
          availableTo: '2016-06-32T07:00:00.000Z',
          price: 150,
          author: 'Phillip',
          rentSchedule: [
            {
              username: 'Phillip',
              from: '2016-06-13',
              to: '2016-06-15'
            }
          ]
        }
      };
      request(options1, function (err) {
        if(err) return done(err);
        request(options, function (err, res) {
          if(err) return done(err);
          var body = JSON.parse(res.body);
          expect(res.statusCode).to.equal(200);
          expect(body).to.have.lengthOf(2);
          expect(body[1]).to.have.property('author');
          expect(body[1].description).to.equal('Totally changed Description');
          expect(body[1].rentSchedule[0].username).to.equal('Phillip');
          done();
        });
      });
    });

    it('Be Able to Update Products Rental Schedule By Only Sending the productId and rentSchedule Object', function (done) {
      var options1 = {
        'method': 'PUT',
        'headers': {
          'Authorization': 'Bearer ' + tokenOfPhillip
        },
        'followAllRedirects': true,
        'uri': 'http://localhost:' + port + '/products/rent/' + idOfSecondItem,
        'json': {
          username: 'notPhillip'
        }
      };
      request(options1, function (err) {
        if(err) return done(err);
        request(options, function (err, res) {
          if(err) return done(err);
          var body = JSON.parse(res.body);
          expect(res.statusCode).to.equal(200);
          expect(body).to.have.lengthOf(2);
          expect(body[1]).to.have.property('author');
          expect(body[1].description).to.equal('Totally changed Description');
          expect(body[1].rentSchedule[0].username).to.equal('notPhillip');
          expect(body[1].rentSchedule[0].from).to.equal('available');
          expect(body[1].rentSchedule[0].to).to.equal('available');
          done();
        });
      });
    });

  });
});
