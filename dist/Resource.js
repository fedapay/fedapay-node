"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize = require("pluralize");
var Error_1 = require("./Error");
var FedaPay_1 = require("./FedaPay");
var FedaPayObject_1 = require("./FedaPayObject");
var Requestor_1 = require("./Requestor");
var Util_1 = require("./Util");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resource.setRequestor = function (req) {
        Resource.requestor = req;
    };
    Resource.getRequestor = function () {
        return Resource.requestor || new Requestor_1.Requestor();
    };
    Resource.className = function () {
        return this.name.toLowerCase();
    };
    Resource.classPath = function () {
        var base = this.className();
        var plural = pluralize(base);
        return "/" + plural;
    };
    Resource.resourcePath = function (id) {
        if (id === null) {
            var klass = this.className();
            var message = "Could not determine which URL to request: " + klass + " instance has invalid ID: " + id;
            throw new Error_1.InvalidRequest(message);
        }
        var base = this.classPath();
        var extn = encodeURI("" + id);
        return base + "/" + extn;
    };
    Resource.prototype.instanceUrl = function () {
        return this.constructor.resourcePath(this.id);
    };
    Resource._validateParams = function (params) {
        if (params === void 0) { params = null; }
        if (params && typeof params != 'object') {
            var message = "You must pass an object as the first argument to FedaPay API\n            method calls.  (HINT: an example call to create a customer\n            would be: FedaPay.Customer.create({'firstname': toto,\n            'lastname': 'zoro', 'email': 'admin@gmail.com', 'phone': '66666666'})";
            throw new Error_1.InvalidRequest(message);
        }
    };
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
    Resource._retrieve = function (id, headers) {
        if (headers === void 0) { headers = {}; }
        var url = this.resourcePath(id);
        var className = this.className();
        return this._staticRequest('get', url, null, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = Util_1.arrayToFedaPayObject(data, options);
            return object[className];
        });
    };
    Resource._all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        this._validateParams(params);
        var path = this.classPath();
        return this._staticRequest('get', path, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return Util_1.arrayToFedaPayObject(data, options);
        });
    };
    Resource._create = function (params, headers) {
        this._validateParams(params);
        var url = this.classPath();
        var className = this.className();
        return this._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = Util_1.arrayToFedaPayObject(data, options);
            return object[className];
        });
    };
    Resource._update = function (id, params, headers) {
        this._validateParams(params);
        var url = this.resourcePath(id);
        var className = this.className();
        return this._staticRequest('put', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = Util_1.arrayToFedaPayObject(data, options);
            return object[className];
        });
    };
    Resource.prototype._delete = function (headers) {
        var _this = this;
        var url = this.instanceUrl();
        return Resource._staticRequest('delete', url, [], headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return _this;
        });
    };
    Resource.prototype._save = function (headers) {
        var _this = this;
        var params = this.serializeParameters();
        var className = Resource.className();
        var url = this.instanceUrl();
        return Resource._staticRequest('PUT', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var klass = options.apiVersion + " / " + className;
            var json = data[klass];
            _this.refreshFrom(json, options);
            return _this;
        });
    };
    return Resource;
}(FedaPayObject_1.FedaPayObject));
exports.Resource = Resource;
