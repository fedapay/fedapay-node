"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Error_1 = require("./Error");
var FedaPay_1 = require("./FedaPay");
;
var Requestor = /** @class */ (function () {
    function Requestor() {
        this.SANDBOX_BASE = 'https://sdx-api.fedapay.com';
        this.PRODUCTION_BASE = 'https://api.fedapay.com';
        this.accountId = '';
        this.apiKey = FedaPay_1.FedaPay.getApiKey();
        this.token = FedaPay_1.FedaPay.getToken();
        this.environment = FedaPay_1.FedaPay.getEnvironment();
        this.apiVersion = FedaPay_1.FedaPay.getApiVersion();
        this.accountId = FedaPay_1.FedaPay.getAccountId();
    }
    /**
     * Set the http client isntance
     * @param client AxiosInstance
     */
    Requestor.setHttpClient = function (client) {
        Requestor.httpClient = client;
    };
    /**
     * @returns
     */
    Requestor.prototype.httpClient = function () {
        if (!Requestor.httpClient) {
            var options = {};
            if (FedaPay_1.FedaPay.getVerifySslCerts()) {
                // TODO Set ca bundle file to the request
            }
            Requestor.httpClient = axios_1.default.create(options);
            this.applyRequestInterceptors(Requestor.httpClient);
        }
        return Requestor.httpClient;
    };
    /**
     * Set the http client isntance
     * @param client AxiosInstance
     */
    Requestor.addRequestInterceptor = function (interceptor) {
        this.requestInterceptors.push(interceptor);
    };
    /**
     * Apply request interceptor
     * @param httpClient AxiosInstance
     */
    Requestor.prototype.applyRequestInterceptors = function (httpClient) {
        Requestor.requestInterceptors.forEach(function (interceptor) {
            httpClient.interceptors.request.use(interceptor.callback, interceptor.onRejected);
        });
    };
    Requestor.prototype.request = function (method, path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var url = this.url(path);
        method = method.toUpperCase();
        headers = Object.assign(this.defaultHeaders(), headers);
        var requestConfig = {
            method: method,
            url: url,
            headers: headers,
            responseType: 'json'
        };
        if (['GET', 'HEAD', 'DELETE'].includes(method)) {
            requestConfig['params'] = params;
        }
        else {
            requestConfig['data'] = params;
        }
        return this.httpClient().request(requestConfig)
            .catch(this.handleRequestException);
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
        var message = "Request error: " + e.message;
        var httpStatusCode = e.response ? e.response.status : null;
        var httpRequest = e.request;
        var httpResponse = e.response;
        return Promise.reject(new Error_1.ApiConnectionError(message, httpStatusCode, httpRequest, httpResponse));
    };
    Requestor.prototype.url = function (path) {
        if (path === void 0) { path = ''; }
        return this.baseUrl() + "/" + this.apiVersion + path;
    };
    Requestor.prototype.defaultHeaders = function () {
        var _default = {
            'X-Version': FedaPay_1.FedaPay.VERSION,
            'X-Source': 'FedaPay NodeLib',
            'Authorization': 'Bearer ' + (this.apiKey || this.token)
        };
        if (this.accountId) {
            _default['FedaPay-Account'] = this.accountId;
        }
        return _default;
    };
    Requestor.requestInterceptors = [];
    return Requestor;
}());
exports.Requestor = Requestor;
