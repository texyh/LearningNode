require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middlewares/auth');

var app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    })
 
    todo.save().then((doc) => {
        res.send(doc)
    }, err => {
        res.status(400).send(err)
    })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator :req.user._id
    }).then((todos) => {
        res.send({todos})
    }, err => {
        res.status(400).send(err);
    })
})

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(400).send("invalid id")
    }

    Todo.findOne({
        _id: id,
        _creator : req.user._id
    }).then(todo => {
        if(!todo) {
            res.status(404).send('no todo with that id exists');
        }
        res.send(todo)
    }).catch( err => res.status(404).send(err))
})

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(400).send('bad request');
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator : req.user._id
    }).then(todo => {
        if(!todo) {
            res.status(404).send('no todo with that id exists');
        }
        res.send(todo);
    }).catch(err => res.status(404).send(err));
})

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completeAt = null;
    }

    Todo.findOneAndUpdate({id, _creator : req.user._id},
        {$set : body}, {new : true}).then(todo => {
        if(!todo) {
            return res.status(400).send();
        }
        res.send(todo);
    }).catch(e =>  {
        res.status(400).send();
    })
})

app.post('/users/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user =  new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    })
    .then(token => {
        res.header('x-auth', token).send(user);
    })
    .catch(err => res.status(400).send(err));
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    debugger;
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user);
        })
    }).catch(e => res.status(404).send(e));
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    })
})


app.listen(process.env.PORT, () => {
    console.log('started');
})

module.exports = {app}

