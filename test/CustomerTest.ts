import { expect } from 'chai';
import * as nock from 'nock';
import { ApiConnectionError, Customer, FedaPayObject } from '../src';
import { exceptRequest, setUp, tearDown } from './utils';

describe('CustomerTest', () => {

    beforeEach(setUp);
    afterEach(tearDown);

    it('should return customers', async () => {
        let body = {
            'v1/customers': [{
                'id': 1,
                'klass': 'v1/customer',
                'firstname': 'John',
                'lastname': 'Doe',
                'email': 'john.doe@example.com',
                'phone': '22967666776',
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }],
            'meta': { 'page': 1 }
        };

        nock(/fedapay\.com/)
            .get('/v1/customers')
            .reply(200, body);

        let object = await Customer.all();

        exceptRequest({
            url: 'https://sdx-api.fedapay.com/v1/customers',
            method: 'get'
        });

        expect(object).to.be.instanceof(FedaPayObject);
        expect(object.meta).to.be.instanceof(FedaPayObject);
        expect(object.customers[0]).to.be.instanceof(Customer);
        expect(object.customers[0].firstname).to.equal('John');
        expect(object.customers[0].lastname).to.equal('Doe');
        expect(object.customers[0].email).to.equal('john.doe@example.com');
        expect(object.customers[0].phone).to.equal('22967666776');
    });

    it('should fail customer creation', async () => {
        let body = {
            'message': 'Account creation failed',
            'errors': {
                'lastname': ['lastname field required']
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/customers')
            .reply(500, body);

        try {
            await Customer.create({'firstname': 'Myfirstname' });
        } catch (e) {
            exceptRequest({
                url: 'https://sdx-api.fedapay.com/v1/customers',
                data: '{"firstname":"Myfirstname"}',
                method: 'post'
            });
            expect(e).to.be.instanceof(ApiConnectionError);
            expect(e.hasErrors()).to.be.true;
            expect(e.errorMessage).to.not.be.null;
            expect(e.errors).to.have.keys('lastname');
        }
    });
});
