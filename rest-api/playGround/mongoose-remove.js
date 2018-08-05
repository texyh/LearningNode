const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('../server/models/todo');

const id = '5b6742c37ecc893e4879e458';

// Todo.remove({}).then(result => {
//     console.log(result);
// })
// Todo.findOneAndRemove({_id:id})

Todo.findByIdAndRemove(id).then(todo => {
    console.log(todo);
})
