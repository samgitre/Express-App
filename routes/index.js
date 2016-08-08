var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var message = "Welcome to my todo app";
  res.render('index', { title: 'The Express App', name: message });
});

var todos =[
    {
        id : 1,
        description: 'Go to class by 4:30pm',
        completed : false
    },
    { id : 2,
        description: 'Go some coding now',
        completed : false
    }];

router.get('/todo' , function (req, res) {
    res.json(todos);
});

module.exports = router;
