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
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transaction.prototype.generateToken = function (params, headers) {
        if (params === void 0) { params = []; }
        if (headers === void 0) { headers = []; }
        var url = this.instanceUrl() + "/token";
        var response, opts = Resource_1.Resource.staticRequest('post', url, params, headers);
        return Utils_1.arrayToFedaPayObject(response, opts);
    };
    return Transaction;
}(Resource_1.Resource));
exports.Transaction = Transaction;
