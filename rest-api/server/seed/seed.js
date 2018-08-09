const {ObjectId} = require('mongodb');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');

const todos = [
    {
        _id : new ObjectId(),
        text: 'first'
    }, 
    {
        _id : new ObjectId(),
        text:'second'
    }
]
const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [
    {
        _id : userOneId,
        email: 'onwuzulikee1@gmail.com',
        password : 'user1password',
        tokens : [{
            access : 'auth',
            token : jwt.sign({_id: userOneId, access : 'auth'}, 'emeka').toString()
        }]
    },
     {
         _id : userTwoId,
         email : 'test@example.com',
         password : 'user2password'
     }
]

const populateTodos = (done) => {
    Todo.insertMany(todos).then(() => done()).catch(e => done(e));
}

const populateUsers = (done) => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => {
        done()
    })
}

const deleteUsers = (done) => {
    User.remove({}).then(() => {
        //done();
    })
}

const deleteTodos = (done) => {
    Todo.remove({}).then(() => console.log());
}

module.exports = {
    todos,
    populateTodos,
    deleteTodos,
    populateUsers,
    deleteUsers,
    users
}