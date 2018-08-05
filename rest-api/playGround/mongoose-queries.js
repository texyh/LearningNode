const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('../server/models/todo');

var id = '5b6618ba0c5f2a2468a309c7';
if(!ObjectID.isValid(id)) {
    console.log('not valid')
}

// Todo.find({
//     _id : id
// }).then((todos) => {
//     debugger
//     console.log(todos)
// }).catch(err => console.log(err));

// Todo.findOne({
//     _id : id
// }).then((todo) => console.log(todo))
// .catch(err => console.log(err));

// Todo.findById(id).then((todo) => {
//     console.log('Todo By Id', todo);
// }).catch(err => console.log(err));
