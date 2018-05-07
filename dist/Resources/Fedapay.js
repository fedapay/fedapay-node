"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var Fedapay = /** @class */ (function () {
    function Fedapay() {
        this.VERSION = '0.1.1';
        this.apiKey = '';
        this.token = '';
        this.accountId = '';
        this.environment = 'sandbox';
        this.apiVersion = 'v1';
        this.verifySslCerts = true;
        this.caBundlePath = '';
    }
    Fedapay.prototype.setApiKey = function (apiKey) {
        this.apiKey = apiKey;
        this.token = '';
    };
    Fedapay.prototype.getApiKey = function () {
        return this.apiKey;
    };
    Fedapay.prototype.setToken = function (token) {
        this.token = token;
    };
    Fedapay.prototype.getCaBundlePath = function () {
        if (!this.caBundlePath) {
            this.caBundlePath = path.join(__dirname, './../data/ca-certificates.crt');
        }
        return this.caBundlePath;
    };
    return Fedapay;
}());
exports.Fedapay = Fedapay;
