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
exports.Account = void 0;
var Resource_1 = require("./Resource");
/**
 * Class Account
 *
 * @property int $id
 * @property string $name
 * @property string $timezone
 * @property string $country
 * @property string $verify
 * @property string $created_at
 * @property string $updated_at
 */
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Account>}
     */
    Account.retrieve = function (id, params, headers) {
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
    Account.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Account>}
     */
    Account.create = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._create(params, headers);
    };
    /**
     * @param {string} id The ID of the acount to update.
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Account>}
     */
    Account.update = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._update(id, params, headers);
    };
    /**
     * @param {Object|string|null} headers
     *
     * @returns {Promise<Account>} The saved account.
     */
    Account.prototype.save = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._save(headers);
    };
    /**
     * @param {Object} headers
     *
     * @returns {<Promise<Account>>} Account The deleted account.
     */
    Account.prototype.delete = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._delete(headers);
    };
    Account.ressourceName = 'account';
    return Account;
}(Resource_1.Resource));
exports.Account = Account;
