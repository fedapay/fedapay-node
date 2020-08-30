import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';
import * as faker from 'faker';
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
            url: 'https://sandbox-api.fedapay.com/v1/customers',
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
        let data = {'firstname': 'Myfirstname' };
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
            await Customer.create(data);
        } catch (e) {
            exceptRequest({
                url: 'https://sandbox-api.fedapay.com/v1/customers',
                data: JSON.stringify(data),
                method: 'post'
            });
            expect(e).to.be.instanceof(ApiConnectionError);
            expect(e.hasErrors()).to.be.true;
            expect(e.errorMessage).to.not.be.null;
            expect(e.errors).to.have.keys('lastname');
        }
    });

    it('should create a customer', async () => {
        let data = {
            'firstname': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumber()
        };

        let body = {
            'v1/customer': {
                'id': 1,
                'klass': 'v1/customer',
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'phone': data.phone,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/customers')
            .reply(200, body);

        let customer = await Customer.create(data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/customers',
            data: JSON.stringify(data),
            method: 'post'
        });
        expect(customer).to.be.instanceof(Customer);
        expect(customer.firstname).to.equal(data.firstname);
        expect(customer.lastname).to.equal(data.lastname);
        expect(customer.email).to.equal(data.email);
        expect(customer.phone).to.equal(data.phone);
        expect(customer.id).to.equal(1);
    });

    it('should retrieve a customer', async () => {
        let data = {
            'firstname': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumber()
        };

        let body = {
            'v1/customer': {
                'id': 1,
                'klass': 'v1/customer',
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'phone': data.phone,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .get('/v1/customers/1')
            .reply(200, body);

        let customer = await Customer.retrieve(1);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/customers/1',
            method: 'get'
        });
        expect(customer).to.be.instanceof(Customer);
        expect(customer.firstname).to.equal(data.firstname);
        expect(customer.lastname).to.equal(data.lastname);
        expect(customer.email).to.equal(data.email);
        expect(customer.phone).to.equal(data.phone);
        expect(customer.id).to.equal(1);
    });

    it('should update a customer', async () => {
        let data = {
            'firstname': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumber()
        };

        let body = {
            'v1/customer': {
                'id': 1,
                'klass': 'v1/customer',
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'phone': data.phone,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .put('/v1/customers/1')
            .reply(200, body);

        let customer = await Customer.update(1, data);

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/customers/1',
            data: JSON.stringify(data),
            method: 'put'
        });
        expect(customer).to.be.instanceof(Customer);
        expect(customer.firstname).to.equal(data.firstname);
        expect(customer.lastname).to.equal(data.lastname);
        expect(customer.email).to.equal(data.email);
        expect(customer.phone).to.equal(data.phone);
        expect(customer.id).to.equal(1);
    });

    it('should update a customer with save', async () => {
        let data = {
            'firstname': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumber()
        };

        let body = {
            'v1/customer': {
                'id': 1,
                'klass': 'v1/customer',
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'phone': data.phone,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/customers')
            .reply(200, body);

        let customer = await Customer.create(data);
        let updateData = customer.serializeParameters();

        customer.firstname = 'First Name';

        nock(/fedapay\.com/)
            .put('/v1/customers/1')
            .reply(200, body);

        await customer.save();

        updateData.firstname = 'First Name'

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/customers/1',
            data: JSON.stringify(updateData),
            method: 'put'
        });
    });

    it('should delete customer', async () => {
        let data = {
            'firstname': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'email': faker.internet.email(),
            'phone': faker.phone.phoneNumber()
        };

        let body = {
            'v1/customer': {
                'id': 1,
                'klass': 'v1/customer',
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'phone': data.phone,
                'created_at': '2018-03-12T09:09:03.969Z',
                'updated_at': '2018-03-12T09:09:03.969Z'
            }
        };

        nock(/fedapay\.com/)
            .post('/v1/customers')
            .reply(200, body);

        let customer = await Customer.create(data);

        nock(/fedapay\.com/)
            .delete('/v1/customers/1')
            .reply(200);

        await customer.delete();

        exceptRequest({
            url: 'https://sandbox-api.fedapay.com/v1/customers/1',
            method: 'delete'
        });
    });
});
