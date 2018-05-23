"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var FedaPay = /** @class */ (function () {
    function FedaPay() {
        this.VERSION = '0.1.1';
    }
    FedaPay.setApiKey = function (apiKey) {
        FedaPay.apiKey = apiKey;
        FedaPay.token = '';
    };
    FedaPay.setToken = function (token) {
        FedaPay.token = token;
    };
    FedaPay.setEnvironment = function (value) {
        FedaPay.environment = value;
    };
    FedaPay.getEnvironment = function () {
        return FedaPay.environment;
    };
    FedaPay.getApiVersion = function () {
        return FedaPay.apiVersion;
    };
    FedaPay.setVerifySslCerts = function (value) {
        FedaPay.verifySslCerts = value;
    };
    FedaPay.getVerifySslCerts = function () {
        return FedaPay.verifySslCerts;
    };
    FedaPay.setCaBundlePath = function (value) {
        FedaPay.caBundlePath = value;
    };
    FedaPay.getCaBundlePath = function () {
        if (!FedaPay.caBundlePath) {
            FedaPay.caBundlePath = path.join(__dirname, './../data/ca-certificates.crt');
        }
        return FedaPay.caBundlePath;
    };
    FedaPay.apiKey = '';
    FedaPay.token = '';
    FedaPay.accountId = '';
    FedaPay.environment = 'sandbox';
    FedaPay.apiVersion = 'v1';
    FedaPay.verifySslCerts = true;
    FedaPay.caBundlePath = '';
    return FedaPay;
}());
exports.FedaPay = FedaPay;
