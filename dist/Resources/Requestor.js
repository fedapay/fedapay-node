"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fedapay_1 = require("./Fedapay");
var request = require('request');
var Requestor = /** @class */ (function () {
    function Requestor() {
        this.SANDBOX_BASE = 'https://sdx-api.fedapay.com';
        this.PRODUCTION_BASE = 'https://api.fedapay.com';
        this.apiKey = '';
        this.token = '';
        this.environment = '';
        this.apiVersion = '';
        this.accountId = '';
        this.apiKey = new Fedapay_1.Fedapay().apiKey;
        this.token = new Fedapay_1.Fedapay().token;
        this.environment = new Fedapay_1.Fedapay().environment;
        this.apiVersion = new Fedapay_1.Fedapay().apiVersion;
        this.accountId = new Fedapay_1.Fedapay().accountId;
    }
    Requestor.prototype.request = function (method, path, params, headers) {
        if (params === void 0) { params = []; }
        if (headers === void 0) { headers = []; }
        try {
            if (!headers) {
                headers = [];
            }
            if (!params) {
                params = [];
            }
            var url = this.url(path);
            method = method.toUpperCase();
            var options = { 'headers': headers };
            request({
                method: method,
                uri: 'http://www.google.com',
                har: {
                    url: 'http://www.mockbin.com/har',
                    method: 'POST',
                    headers: [
                        {
                            name: 'content-type',
                            value: 'application/x-www-form-urlencoded'
                        }
                    ],
                    postData: {
                        mimeType: 'application/x-www-form-urlencoded',
                        params: [
                            {
                                name: 'foo',
                                value: 'bar'
                            },
                            {
                                name: 'hello',
                                value: 'world'
                            }
                        ]
                    }
                }
            });
        }
        catch (error) {
        }
    };
    Requestor.prototype.baseUrl = function () {
        switch (this.environment) {
            case 'development':
            case 'sandbox':
            case 'test':
            case null:
                return this.SANDBOX_BASE;
            case 'production':
            case 'live':
                return this.PRODUCTION_BASE;
        }
    };
    Requestor.prototype.url = function (path) {
        if (path === void 0) { path = ''; }
        return this.baseUrl() + "/" + this.apiVersion;
    };
    return Requestor;
}());
exports.Requestor = Requestor;
