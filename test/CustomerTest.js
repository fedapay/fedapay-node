let expect = require('chai').expect;
let lib = require('../dist/index.js');
let request = require('request');

describe('CustomerTest', () => {

    before(function() {
        // Create Server Here
        lib.FedaPay.setApiKey('sk_test_123');
        lib.FedaPay.setEnvironment('live');
    })


    it('should return customers', () => {
        //        let data = lib.Customer.all({}, {});
    });
});