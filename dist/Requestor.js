"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requestor = void 0;
var axios_1 = require("axios");
var Error_1 = require("./Error");
var FedaPay_1 = require("./FedaPay");
;
/**
* Class Requestor
*/
var Requestor = /** @class */ (function () {
    function Requestor() {
        this.SANDBOX_BASE = 'https://sandbox-api.fedapay.com';
        this.PRODUCTION_BASE = 'https://api.fedapay.com';
        this.DEVELOPMENT_BASE = 'https://dev-api.fedapay.com';
    }
    /**
     * Set the http client isntance
     * @param {AxiosInstance} client
     */
    Requestor.setHttpClient = function (client) {
        Requestor.httpClient = client;
    };
    /**
     * Return the httpClient
     * @returns {AxiosInstance}
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
     * @param {AxiosInstance} client
     */
    Requestor.addRequestInterceptor = function (interceptor) {
        this.requestInterceptors.push(interceptor);
    };
    /**
     * Apply request interceptor
     * @param {AxiosInstance} httpClient
     */
    Requestor.prototype.applyRequestInterceptors = function (httpClient) {
        Requestor.requestInterceptors.forEach(function (interceptor) {
            httpClient.interceptors.request.use(interceptor.callback, interceptor.onRejected);
        });
    };
    /**
     * Sent request
     * @param {string} method
     * @param {string} path
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
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
        if (['GET', 'HEAD', 'DELETE'].indexOf(method) > -1) {
            requestConfig['params'] = params;
        }
        else {
            requestConfig['data'] = params;
        }
        return this.httpClient().request(requestConfig)
            .catch(this.handleRequestException);
    };
    /**
     * Return base url
     * @returns {string}
     */
    Requestor.prototype.baseUrl = function () {
        var apiBase = FedaPay_1.FedaPay.getApiBase();
        var environment = FedaPay_1.FedaPay.getEnvironment();
        if (apiBase) {
            return apiBase;
        }
        switch (environment) {
            case 'development':
            case 'dev':
                return this.DEVELOPMENT_BASE;
            case 'sandbox':
            case 'test':
            case null:
                return this.SANDBOX_BASE;
            case 'production':
            case 'live':
                return this.PRODUCTION_BASE;
        }
    };
    /**
     * Handle request exception
     * @param {any} e
     * @returns {Promise<ApiConnectionError>}
     */
    Requestor.prototype.handleRequestException = function (e) {
        var message = "Request error: ".concat(e.message);
        var httpStatusCode = e.response ? e.response.status : null;
        var httpRequest = e.request;
        var httpResponse = e.response;
        return Promise.reject(new Error_1.ApiConnectionError(message, httpStatusCode, httpRequest, httpResponse));
    };
    /**
     * Return the url
     * @param {string} path
     */
    Requestor.prototype.url = function (path) {
        if (path === void 0) { path = ''; }
        return "".concat(this.baseUrl(), "/").concat(FedaPay_1.FedaPay.getApiVersion()).concat(path);
    };
    /**
     * Return default headers
     * @returns {Object}
     */
    Requestor.prototype.defaultHeaders = function () {
        var token = FedaPay_1.FedaPay.getApiKey() || FedaPay_1.FedaPay.getToken();
        var accountId = FedaPay_1.FedaPay.getAccountId();
        var _default = {
            'X-Version': FedaPay_1.FedaPay.VERSION,
            'X-Source': 'FedaPay NodeLib',
            'Authorization': 'Bearer ' + token
        };
        if (accountId) {
            _default['FedaPay-Account'] = accountId;
        }
        return _default;
    };
    Requestor.requestInterceptors = [];
    return Requestor;
}());
exports.Requestor = Requestor;
