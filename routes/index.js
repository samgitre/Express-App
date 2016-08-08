var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var message = "Welcome to my todo app";
  res.render('index', { title: 'The Express App', name: message });
});

module.exports = router;
