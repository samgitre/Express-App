var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../db');


var todos =[];

var todoId = 1;

router.get('/' , function (req, res) {

    res.render('todo', {title : 'TODO APP'});
});


router.get('/todo' , function (req, res) {
    var query = req.query;
    var where = {};

    if(query.hasOwnProperty('completed') && (query.completed === 'true')){
        where.completed = true;
    }else if(query.hasOwnProperty('completed') && (query.completed === 'false')){
        where.completed = false;
    }
    if(query.hasOwnProperty('q')&& (query.q.length > 0)){
        where.description ={
            $like :'%' + query.q + '%'
        }
    }
    db.todo.findAll({where : where}).then(function (todo) {
        res.json(todo);
    }, function (e) {
        res.status(500).send(e.message);
    });

    // if(queryParams.hasOwnProperty('completed') && (queryParams.completed === 'true')){
    //     filteredTodos =_.where(filteredTodos, {completed :true});
    //
    // }else if(queryParams.hasOwnProperty('completed') && (queryParams.completed === 'false')){
    //     filteredTodos = _.where(filteredTodos, {completed : false});
    // }
    //
    // if(queryParams.hasOwnProperty('q') && queryParams.q.length >0){
    //     filteredTodos = _.filter(filteredTodos, function (todo) {
    //         return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    //     });
    // }
    // res.json(filteredTodos);
});

router.get('/todo/:id', function (req, res) {
    var matchTodo = parseInt(req.params.id, 10);

    db.todo.findById(matchTodo).then(function (todo) {
        if(!!todo){
            res.json(todo.toJSON());
        }
        else {
            res.status(404).send('todo not found');
        }
    }, function (e) {
        res.status(500).send(e.message);

    });    // var matchItems = _.findWhere(todos, {id: matchTodo});
    // if(matchItems){
    //     res.json(matchItems);
    // }
    // else {
    //     res.status(404).json('No todo found with id : ' +req.params.id);
    // }
});

router.post('/addTodo', function (req, res) {
   var body = _.pick(req.body, 'description', 'completed');
  db.todo.create(body).then(function (todo) {
      res.json(todo.toJSON);
  }, function (e) {
      res.status(400).json(e.message);
  });
    // if(!_.isBoolean(body.completed) || !_.isString(body.description) || !body.description.trim())
    // {
    //  return  res.status(400).send();
    // }
    // body.description = body.description.trim();
    // body.id = todoId++;
    // todos.push(body);
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