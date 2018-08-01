const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser : expect.createSpy()
    }

    app.__set__('db', db)

    it('should call spies correctly', () => {
        const spy = expect.createSpy();
        spy();

        expect(spy).toHaveBeenCalled();
    })

    it('should save user', () => {
        var user = {
            email: 'onwuzu@gmail.com',
            password : '123fdsd'
        }
        app.handleSignup(user.email, user.password);
        expect(db.saveUser).toHaveBeenCalledWith({email: user.email, password : user.password});
    })
})