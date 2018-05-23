"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FedaPay_1 = require("./FedaPay");
var axios_1 = require("axios");
var Requestor = /** @class */ (function () {
    function Requestor() {
        this.SANDBOX_BASE = 'https://sdx-api.fedapay.com';
        this.PRODUCTION_BASE = 'https://api.fedapay.com';
        this.apiKey = '';
        this.token = '';
        this.environment = '';
        this.apiVersion = '';
        this.accountId = '';
        this.apiKey = FedaPay_1.FedaPay.apiKey;
        this.token = FedaPay_1.FedaPay.token;
        this.environment = FedaPay_1.FedaPay.getEnvironment();
        this.apiVersion = FedaPay_1.FedaPay.getApiVersion();
        this.accountId = FedaPay_1.FedaPay.accountId;
    }
    Requestor.prototype.httpClient = function () {
        var options = [];
        if (FedaPay_1.FedaPay.getVerifySslCerts()) { }
    };
    Requestor.prototype.request = function (method, path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        try {
            if (!headers) {
                headers = {};
            }
            if (!params) {
                params = {};
            }
            var url = this._url(path);
            method = method.toUpperCase();
            var options = {};
            options.headers = headers;
            switch (method) {
                case 'GET':
                case 'HEAD':
                case 'DELETE':
                    options.query = params;
                    break;
                default:
                    options.json = params;
                    break;
            }
            var res = axios_1.default({
                method: method,
                url: url,
                headers: options.headers
            })
                .then(function (response) {
                return response.data;
            });
            return res;
        }
        catch (error) {
            this.handleRequestException(error);
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
    Requestor.prototype.handleRequestException = function (e) {
        throw new Error(e);
    };
    Requestor.prototype._url = function (path) {
        if (path === void 0) { path = ''; }
        return this.baseUrl() + "/" + this.apiVersion + path;
    };
    return Requestor;
}());
exports.Requestor = Requestor;
