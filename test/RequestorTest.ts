import { expect } from 'chai';
import * as nock from 'nock';
import { FedaPay, Requestor, ApiConnectionError } from '../src';

describe('RequestorTest', () => {
    beforeEach(() => {
        FedaPay.setApiKey('sk_test_123')
    });

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
            expect(e.httpStatus).to.equals(500);
            expect(e.httpResponse).to.not.be.null;
            expect(e.httpRequest).to.not.be.null;
            expect(e.httpResponse.config.url).to.equals('https://sdx-api.fedapay.com/v1/path');
            expect(e.httpResponse.config.params).to.deep.equals({ foo: '2' });
            expect(e.httpResponse.config.method).to.equals('get');
            expect(e.httpRequest.getHeader('Authorization')).to.equals('Bearer sk_test_123');
            expect(e.httpRequest.getHeader('X-Version')).to.equals(FedaPay.VERSION);
            expect(e.httpRequest.getHeader('X-Source')).to.equals('FedaPay NodeLib');
            expect(e.httpRequest.getHeader('X-Custom')).to.equals('foo');
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
            expect(e.httpStatus).to.equals(500);
            expect(e.httpResponse).to.not.be.null;
            expect(e.httpRequest).to.not.be.null;
            expect(e.httpResponse.config.url).to.equals('https://api.fedapay.com/v3/path');
            expect(e.httpResponse.config.params).to.deep.equals({ foo: '2' });
            expect(e.httpResponse.config.method).to.equals('get');
            expect(e.httpRequest.getHeader('Authorization')).to.equals('Bearer mytoken');
            expect(e.httpRequest.getHeader('X-Version')).to.equals(FedaPay.VERSION);
            expect(e.httpRequest.getHeader('X-Source')).to.equals('FedaPay NodeLib');
            expect(e.httpRequest.getHeader('X-Custom')).to.equals('foo');
            expect(e.httpRequest.getHeader('FedaPay-Account')).to.equals(898);
        }
    });
});
