var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../db');

// var todos =[];
// var todoId = 1;


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
    db.todo.destroy({
        where :{
            id : matchTodo
        }        
    }).then(function (deletedRows) {
        if(deletedRows.length === 0){
            res.status(404).json({
                error : 'No item found with the id   ' + req.params.id
            });
        }
        else {
            res.status(200).json('deleted successfully');
        }
    }).then(function () {
        res.status(500).send();
    }).catch(function (e) {
        res.json({
            error : e.message
        });

    });




    // var matchItem = _.findWhere(todos, {id: matchTodo});
    //
    // if(!matchItem){
    //     res.status(404).json('No item found with id  ' + req.params.id);
    // }
    // else {
    //     todos =_.without(todos, matchItem);
    //     res.json(matchItem);
    // }
});

router.put('/todo/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    // var matchItem = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var attributes ={};

    if(body.hasOwnProperty('completed')){
        attributes.completed = body.completed;
    }
    if(body.hasOwnProperty('description')){
        attributes.description = body.description;
    }
    db.todo.findById(todoId).then(function (todo) {
        if(todo){
            return todo.update(attributes);
        }
        else {
            res.status(404).json('Todo not found');
        }

    }, function () {
        res.status(500).json('internal error');
    }).then(function (todo) {
        res.send(todo.toJSON());
    }, function (e) {
        res.status(400).json(e.message);
    });

    //  matchItem =  _.extend(matchItem,attributes );
    // res.json(matchItem);
});

module.exports = router;