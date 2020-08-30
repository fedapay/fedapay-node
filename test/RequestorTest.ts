import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import { ApiConnectionError, FedaPay, Requestor } from '../src';
import { setUp, tearDown } from './utils';

describe('RequestorTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should have request default params', async () => {
        nock(/fedapay\.com/)
            .get('/v1/path')
            .query({ 'foo': '2' })
            .reply(500, {});

        let requestor = new Requestor();

        try {
            await requestor.request('get', '/path', { 'foo': '2' }, { 'X-Custom': 'foo' });
        } catch (e) {
            expect(e).to.be.an.instanceof(ApiConnectionError)
            expect(e.httpStatus).to.equal(500);
            expect(e.httpResponse).to.not.be.null;
            expect(e.httpRequest).to.not.be.null;
            expect(e.httpResponse.config.url).to.equal('https://sandbox-api.fedapay.com/v1/path');
            expect(e.httpResponse.config.params).to.deep.equal({ foo: '2' });
            expect(e.httpResponse.config.method).to.equal('get');
            expect(e.httpRequest.getHeader('Authorization')).to.equal('Bearer sk_test_123');
            expect(e.httpRequest.getHeader('X-Version')).to.equal(FedaPay.VERSION);
            expect(e.httpRequest.getHeader('X-Source')).to.equal('FedaPay NodeLib');
            expect(e.httpRequest.getHeader('X-Custom')).to.equal('foo');
        }
    });

    it('should set request params', async () => {
        FedaPay.setApiKey(null);
        FedaPay.setApiVersion('v3');
        FedaPay.setEnvironment('production');
        FedaPay.setToken('mytoken');
        FedaPay.setAccountId(898);

        nock(/fedapay\.com/)
            .get('/v3/path')
            .query({ 'foo': '2' })
            .reply(500, {});

        let requestor = new Requestor();

        try {
            await requestor.request('get', '/path', { 'foo': '2' }, { 'X-Custom': 'foo' });
        } catch (e) {
            expect(e).to.be.an.instanceof(ApiConnectionError)
            expect(e.httpStatus).to.equal(500);
            expect(e.httpResponse).to.not.be.null;
            expect(e.httpRequest).to.not.be.null;
            expect(e.httpResponse.config.url).to.equal('https://api.fedapay.com/v3/path');
            expect(e.httpResponse.config.params).to.deep.equal({ foo: '2' });
            expect(e.httpResponse.config.method).to.equal('get');
            expect(e.httpRequest.getHeader('Authorization')).to.equal('Bearer mytoken');
            expect(e.httpRequest.getHeader('X-Version')).to.equal(FedaPay.VERSION);
            expect(e.httpRequest.getHeader('X-Source')).to.equal('FedaPay NodeLib');
            expect(e.httpRequest.getHeader('X-Custom')).to.equal('foo');
            expect(e.httpRequest.getHeader('FedaPay-Account')).to.equal(898);
        }
    });

    it('should set request api base', async () => {
        FedaPay.setApiVersion('v1');
        FedaPay.setApiBase('https://test.fedapay.com');

        nock(/fedapay\.com/)
            .get('/v1/path')
            .query({ 'foo': '2' })
            .reply(500, {});

        let requestor = new Requestor();

        try {
            await requestor.request('get', '/path', { 'foo': '2' }, { 'X-Custom': 'foo' });
        } catch (e) {
            expect(e).to.be.an.instanceof(ApiConnectionError)
            expect(e.httpResponse.config.url).to.equal('https://test.fedapay.com/v1/path');
        }
    });
});
