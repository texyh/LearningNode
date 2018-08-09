const expect = require('expect');
const request = require('supertest')
const {ObjectId} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const{populateTodos, deleteTodos, users, deleteUsers, populateUsers, todos} = require('../seed/seed');

describe('POST /todos', () => {

    beforeEach((done) => {
        deleteTodos(done);
        populateTodos(done);
    });

    beforeEach((done) => {
        deleteUsers(done);
        populateUsers(done);
    });

    // afterEach((done) => {
    //     deleteUsers(done);
    // });

    // afterEach((done) => {
    //     deleteTodos(done);
    // });

    it('should create a new todo', (done) => {

        //todo test branches
        
        var text = 'Text from test';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                   return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            })
    })

    it('should not create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if(err) {
                   return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            })
    })

    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    })

    it('should return todo doc', (done) => {
        //test for invalid id
        // test for id not in database

        request(app)
            .get(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text)
            })
            .end(done);
    })

    it('should return delelte a doc', (done) => {
        //test for invalid id
        // test for id not in database

        request(app)
            .delete(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(todos[0]._id.toString()).then(todo => {
                    expect(todo).toNotExist();
                    done();
                }).catch(err => done(err));
            });
    })

    it('should update a todo', (done) => {
        const updatedTodo  = {
            text : 'this is an update from the test',
            completed : true
        }
        request(app)
            .patch(`/todos/${todos[0]._id.toString()}`)
            .send(updatedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(updatedTodo.text);
            })
            .end((err, res) => {
                if(err) {
                    done(err);
                }

                Todo.findById(todos[0]._id.toString())
                .then(todo => {
                    expect(todo.completed).toBeTruthy();
                    expect(todo.completedAt).toExist();
                    done();
                })
                .catch(e => {
                    done(e);
                })
            })
    })
})

