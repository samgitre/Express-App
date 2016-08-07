var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = "Sam first nodeJs App";
  res.render('index', { title: 'The Express App', name: name });
});

module.exports = router;
