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

    res.render('todo', {title : 'TODO APP'});
});


router.get('/todo' , function (req, res) {

    res.json(todos);
});

router.get('/todo/:id', function (req, res) {
    var matchTodo = parseInt(req.params.id, 10);
    var matchItems;
    todos.forEach(function (match) {
        if(matchTodo === match.id){
            matchItems = match;
        }
    });
    if(matchItems){
        res.json(matchItems);
    }
    else {
        res.status(404).send();
    }
});

module.exports = router;