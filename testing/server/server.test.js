const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

describe('Server', () => {
    it('should return hello world response', (done) => {
        request(app)
            .get('/')
            .expect(404)
            .expect((res) => {
                expect(res.body).toInclude({
                    error : 'page not found',
                    name : 'Api 1'
                });
            })
            .end(done);
    })
    
    it('should get all users', (done) => {
        request(app)
            .get('/users')
            .expect((res) => {
                expect(res.body).toInclude({ name: 'emeka', age : 48});
            })
            .end(done)
    })
})


