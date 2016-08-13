/**
 * Created by Samson on 8/13/2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect' : 'sqlite',
    'storage' : __dirname + '/basic-sqlite-db.sqlite'
});

var Todo = sequelize.define('todo', {
    description:{
        type : Sequelize.STRING,
        allowNull : false,
        validate :{
            len :[1, 250]
        }
    },

    completed : {
        type : Sequelize.BOOLEAN,
        defaultValue : false,
        allowNull : false
    }
});

sequelize.sync().then(function () {
    console.log('every thing is synchronised');
    Todo.create({
        description : 'Do some coding'
    }).then(function (todo) {
        return Todo.create({
            description : 'Call a cab for mum'
        }).then(function (todos) {
            return Todo.findAll({
                where : {
                    description: {
                        $like: '%to%'
                    }
                }
            });
        }).then(function (todo) {
            if(todo){
                todo.forEach(function (todo) {
                    console.log(todo.JSON);
                });
            }
            else {
                console.log('No todo found');
            }
        });
    }).catch(function (e) {
        console.log(e.message);
    });
});

