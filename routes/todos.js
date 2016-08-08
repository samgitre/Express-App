var express = require('express');
var router = express.Router();

var todos =[];

var todoId = 1;

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

router.post('/addTodo', function (req, res) {
   var body = req.body;
    body.id = todoId++;
    todos.push(body);

    res.json(body);
});

module.exports = router;