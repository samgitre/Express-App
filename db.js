/**
 * Created by Samson on 8/13/2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect' : 'sqlite',
    'storage' : __dirname + '/data/todoData.sqlite'
});

var db = {};
db.todo = sequelize.import(__dirname + '/model/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;