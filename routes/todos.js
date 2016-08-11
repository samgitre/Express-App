var express = require('express');
var router = express.Router();
var _ = require('underscore');

var todos =[];

var todoId = 1;

router.get('/' , function (req, res) {

    res.render('todo', {title : 'TODO APP'});
});


router.get('/todo' , function (req, res) {
    var queryParams = req.query;
    var filteredTodos = todos;

    if(queryParams.hasOwnProperty('completed') && (queryParams.completed === 'true')){
        filteredTodos =_.where(filteredTodos, {completed :true});
        
    }else if(queryParams.hasOwnProperty('completed') && (queryParams.completed === 'false')){
        filteredTodos = _.where(filteredTodos, {completed : false});
    }
    res.json(filteredTodos);
});

router.get('/todo/:id', function (req, res) {
    var matchTodo = parseInt(req.params.id, 10);
    var matchItems = _.findWhere(todos, {id: matchTodo});

    if(matchItems){
        res.json(matchItems);
    }
    else {
        res.status(404).json('No todo found with id : ' +req.params.id);
    }
});

router.post('/addTodo', function (req, res) {

   var body = _.pick(req.body, 'description', 'completed');
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || !body.description.trim())
    {
     return  res.status(400).send();
    }
    body.description = body.description.trim();
    body.id = todoId++;
    todos.push(body);
    res.json(body);
});

router.delete('/todo/:id', function (req, res) {
    var matchTodo = parseInt(req.params.id, 10);
    var matchItem = _.findWhere(todos, {id: matchTodo});

    if(!matchItem){
        res.status(404).json('No item found with id  ' + req.params.id);
    }
    else {
        todos =_.without(todos, matchItem);
        res.json(matchItem);
    }

});


router.put('/todo/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchItem = _.findWhere(todos, {id: todoId});

    var body = _.pick(req.body, 'completed', 'description');
    var validAttributes ={};

    if (!matchItem){
      return res.status(404).json('No item with id ' + req.params.id);
    }
    if(body.hasOwnProperty('completed') && (_.isBoolean(body.completed))){
        validAttributes.completed = body.completed;
    }
    else if(body.hasOwnProperty('completed')){
        res.status(400).json('Bad request');
    }
    if(body.hasOwnProperty('description') && (_.isString(body.description)) && body.description.trim().length > 0){
        validAttributes.description = body.description;
    }
    else if(body.hasOwnProperty('description')){
        res.status(400).json('Bad request');
    }

     matchItem =  _.extend(matchItem,validAttributes );
    res.json(matchItem);
});

module.exports = router;