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
exports.Currency = void 0;
var Resource_1 = require("./Resource");
/**
 * Class Currency
 *
 * @property int $id
 * @property string $name
 * @property string $iso
 * @property int $code
 * @property string $prefix
 * @property string $suffix
 * @property string $div
 * @property string $created_at
 * @property string $updated_at
 */
var Currency = /** @class */ (function (_super) {
    __extends(Currency, _super);
    function Currency() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    Currency.retrieve = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._retrieve(id, params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Currency.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    Currency.ressourceName = 'currency';
    return Currency;
}(Resource_1.Resource));
exports.Currency = Currency;
