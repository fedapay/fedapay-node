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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FedaPay_1 = require("./FedaPay");
var FedaPayObject_1 = require("./FedaPayObject");
var Inflector_1 = require("./Inflector");
var Requestor_1 = require("./Requestor");
var Utils_1 = require("./Utils");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resource.setRequestor = function (req) {
        Resource.requestor = req;
    };
    Resource.getRequestor = function (req) {
        return Resource.requestor;
    };
    Resource.prototype.getName = function () {
        return this.constructor.name;
    };
    Resource.className = function () {
        var instance = new this;
        return instance.getName().toLowerCase();
    };
    Resource.classPath = function () {
        var base = this.className();
        var plural = Inflector_1.Inflector.pluralize(base);
        return "/" + plural;
    };
    Resource.resourcePath = function (id) {
        if (id === null) {
            var klass = this.className();
            var message = "Could not determine which URL to request: " + klass + " instance has invalid ID: " + id;
            throw new Error(message);
        }
        var base = this.classPath();
        var extn = encodeURI(id);
        return base + "/" + extn;
    };
    Resource.prototype.instanceUrl = function () {
        return Resource.resourcePath(this.id);
    };
    Resource.retrieve = function (id, headers) {
        if (headers === void 0) { headers = []; }
        var url = this.resourcePath(id);
        var className = this.className();
        var response, opts = this.staticRequest('get', url);
        var object = Utils_1.arrayToFedaPayObject(response, opts);
        return object.toString();
    };
    Resource.staticRequest = function (method, url, params, headers) {
        if (params === void 0) { params = null; }
        if (headers === void 0) { headers = null; }
        return __awaiter(this, void 0, void 0, function () {
            var requestor, response, res, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestor = this.requestor;
                        response = null;
                        return [4 /*yield*/, requestor.request(method, url, params, headers)];
                    case 1:
                        res = _a.sent();
                        options = {
                            'apiVersion': FedaPay_1.FedaPay.getApiVersion(),
                            'environment': FedaPay_1.FedaPay.getEnvironment()
                        };
                        return [2 /*return*/, {
                                res: res,
                                options: options
                            }];
                }
            });
        });
    };
    Resource.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var path, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateParams(params);
                        path = this.classPath();
                        return [4 /*yield*/, this.staticRequest('get', path, params, headers)
                                .then(function (_a) {
                                var res = _a.res, options = _a.options;
                                return {
                                    res: res, options: options
                                };
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, Utils_1.objectToFedaPayObject(data.res, data.options, this.className())];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Resource.validateParams = function (params) {
        if (params === void 0) { params = null; }
        if (typeof params != 'object') {
            var message = "You must pass an object as the first argument to FedaPay API\n            method calls.  (HINT: an example call to create a customer\n            would be: FedaPay.Customer.create({'firstname': toto,\n            'lastname': 'zoro', 'email': 'admin@gmail.com', 'phone': '66666666'})";
            throw new Error(message);
        }
    };
    Resource.create = function (params, headers) {
        this.validateParams(params);
        var url = this.classPath();
        var response, opts = this.staticRequest('post', url, params, headers);
        var object = Utils_1.arrayToFedaPayObject(response, opts);
        return object;
    };
    Resource.update = function (params, headers) {
        this.validateParams(params);
        var url = this.classPath();
        var response, opts = this.staticRequest('put', url, params, headers);
        var object = Utils_1.arrayToFedaPayObject(response, opts);
        return object;
    };
    Resource.prototype.delete = function (headers) {
        var url = this.instanceUrl();
        Resource.staticRequest('delete', url, [], headers);
        return this;
    };
    Resource.prototype.save = function (headers) {
        var params = this.serializeParameters();
        var className = Resource.className();
        var url = this.instanceUrl();
        var response, opts = Resource.staticRequest('PUT', url, params, headers);
        var klass = opts + " / " + className; // TODO
        return this;
    };
    Resource.requestor = new Requestor_1.Requestor();
    return Resource;
}(FedaPayObject_1.FedaPayObject));
exports.Resource = Resource;
