
const utils = require('./utils');
const expect = require('expect');

describe('Util', () => {
    it('should add two numbers', () => {
        let add = utils.add(5, 6);
        expect(add).toBe(11);
    })
    
    it('should square a number', () => {
        let square = utils.square(6);
        expect(square).toBe(36);
    })
    
    it('should add asysnc', (done) => {
        utils.addAsync(5, 5, (ans) => {
            expect(ans).toBe(10);
            done();
        })
    })
})
