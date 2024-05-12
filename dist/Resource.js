"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var pluralize = require("pluralize");
var Error_1 = require("./Error");
var FedaPay_1 = require("./FedaPay");
var FedaPayObject_1 = require("./FedaPayObject");
var Requestor_1 = require("./Requestor");
var Util_1 = require("./Util");
/**
 * Class Resource
 */
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set requestor
     * @param {Requestor} req
     */
    Resource.setRequestor = function (req) {
        Resource.requestor = req;
    };
    /**
     * Return the requestor
     * @returns {Requestor}
     */
    Resource.getRequestor = function () {
        return Resource.requestor || new Requestor_1.Requestor();
    };
    /**
     * Return class name
     * @returns {string}
     */
    Resource.className = function () {
        return this.ressourceName.toLowerCase();
    };
    /**
     * Return the class path
     * @return {string}
     */
    Resource.classPath = function () {
        var base = this.className();
        var plural = pluralize(base);
        return "/".concat(plural);
    };
    /**
     * Return the resource path
     * @param {number|string} id
     * @returns {string}
     */
    Resource.resourcePath = function (id) {
        if (id === null) {
            var klass = this.className();
            var message = "Could not determine which URL to request: ".concat(klass, " instance has invalid ID: ").concat(id);
            throw new Error_1.InvalidRequest(message);
        }
        var base = this.classPath();
        var extn = encodeURI("".concat(id));
        return "".concat(base, "/").concat(extn);
    };
    /**
     * Return the instance url
     * @returns {string}
     */
    Resource.prototype.instanceUrl = function () {
        return this.constructor.resourcePath(this.id);
    };
    /**
     * Validate params
     * @param {Object|null} params
     */
    Resource._validateParams = function (params) {
        if (params === void 0) { params = null; }
        if (params && typeof params != 'object') {
            var message = "You must pass an object as the first argument to FedaPay API\n            method calls.  (HINT: an example call to create a customer\n            would be: Customer.create({'firstname': toto,\n            'lastname': 'zoro', 'email': 'admin@gmail.com', 'phone': '66666666'})";
            throw new Error_1.InvalidRequest(message);
        }
    };
    /**
     * Send static request
     * @param {string} method
     * @param {string} url
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<AxiosResponse<any>>}
     */
    Resource._staticRequest = function (method, url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return Resource.getRequestor().request(method, url, params, headers)
            .then(function (response) {
            var options = {
                'apiVersion': FedaPay_1.FedaPay.getApiVersion(),
                'environment': FedaPay_1.FedaPay.getEnvironment()
            };
            return { data: response.data, options: options };
        });
    };
    /**
     * Retrieve resource
     * @param {string|number} id
     * @param {Object|null} headers
     */
    Resource._retrieve = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var url = this.resourcePath(id);
        var className = this.className();
        return this._staticRequest('get', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object[className];
        });
    };
    /**
     * Send list reource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject|FedaPayObject[]>}
     */
    Resource._all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        this._validateParams(params);
        var path = this.classPath();
        return this._staticRequest('get', path, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return (0, Util_1.arrayToFedaPayObject)(data, options);
        });
    };
    /**
     * Send create resource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Resource._create = function (params, headers) {
        this._validateParams(params);
        var url = this.classPath();
        var className = this.className();
        return this._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object[className];
        });
    };
    /**
     * Send create resource request
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Resource._update = function (id, params, headers) {
        this._validateParams(params);
        var url = this.resourcePath(id);
        var className = this.className();
        return this._staticRequest('put', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object[className];
        });
    };
    /**
     * Send delete resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Resource.prototype._delete = function (headers) {
        var _this = this;
        var url = this.instanceUrl();
        return Resource._staticRequest('delete', url, [], headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return _this;
        });
    };
    /**
     * Send create or update resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Resource.prototype._save = function (headers) {
        var _this = this;
        var params = this.serializeParameters();
        var className = Resource.className();
        var url = this.instanceUrl();
        return Resource._staticRequest('PUT', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var klass = "".concat(options.apiVersion, " / ").concat(className);
            var json = data[klass];
            _this.refreshFrom(json, options);
            return _this;
        });
    };
    Resource.ressourceName = 'Resource';
    return Resource;
}(FedaPayObject_1.FedaPayObject));
exports.Resource = Resource;
