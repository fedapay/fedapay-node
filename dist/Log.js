"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
/**
 * Class Log
 *
 * @property int $id
 * @property string $method
 * @property string $url
 * @property string $status
 * @property string $ip_address
 * @property string $version
 * @property string $source
 * @property string $query
 * @property string $body
 * @property string $response
 * @property int $account_id
 * @property string $created_at
 * @property string $updated_at
 */
var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Log.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Event>}
     */
    Log.retrieve = function (id, headers) {
        if (headers === void 0) { headers = {}; }
        return this._retrieve(id, headers);
    };
    return Log;
}(_1.Resource));
exports.Log = Log;
