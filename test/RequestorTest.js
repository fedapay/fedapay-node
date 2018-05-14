let expect = require('chai').expect;
let lib = require('../dist/index.js');

describe('RequestorTest', () => {
    it('should have request default params', () => {
        let requestor = new lib.Requestor();
        try {
            requestor.request('get', '/path', { 'foo': '2' }, { 'X-Custom': 'foo' });
        } catch (e) {
            let httpRequest = e.httpRequest;
            let httpResponse = e.httpResponse;
            let httpStatus = e.httpStatus;

            expect(httpStatus).to.equal(500);
            expect(httpResponse).to.not.be.null;
            expect(httpRequest).to.not.be.null;
        }
    });
});