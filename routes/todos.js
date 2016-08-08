var express = require('express');
var router = express.Router();

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

router.get('/' , function (req, res) {

    res.json(todos);
});

module.exports = router;