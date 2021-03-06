require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middlewares/auth');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text : req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, err => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, err => {
        res.status(400).send(err);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(400).send("invalid id")
    }

    Todo.findById(id).then(todo => {
        if(!todo) {
            res.status(404).send('no todo with that id exists');
        }
        res.send(todo)
    }).catch( err => res.status(404).send(err))

})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(400).send('bad request');
    }

    Todo.findOneAndRemove(id).then(todo => {
        if(!todo) {
            res.status(404).send('no todo with that id exists');
        }
        res.send(todo);
    }).catch(err => res.status(404).send(err));
})

app.patch('/todos/:id', (req, res) => {
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

    Todo.findByIdAndUpdate(id, 
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


app.listen(process.env.PORT, () => {
    console.log('started on port ' +  process.env.NODE_ENV);
})

module.exports = {app}

