var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', function(req, res, next) {

  var body = _.pick(req.body, 'email', 'password');
  db.user.create(body).then(function (user) {
    res.send(user.toPublicJSON());
  },function (e) {
    res.status(400).send(e);
      });
});

module.exports = router;
