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
exports.Customer = void 0;
var Resource_1 = require("./Resource");
/**
 * Class Customer
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property string $phone
 * @property string $created_at
 * @property string $updated_at
 */
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {string|number} id The customer id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Customer>}
     */
    Customer.retrieve = function (id, params, headers) {
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
    Customer.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    Customer.create = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._create(params, headers);
    };
    /**
     * @param {string|number} id The ID of the customer to update.
     * @param {Object|null} params
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>}
     */
    Customer.update = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._update(id, params, headers);
    };
    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} The saved customer.
     */
    Customer.prototype.save = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._save(headers);
    };
    /**
     * @param {Object|null} headers
     *
     * @returns {Promise<Customer>} Customer The deleted customer.
     */
    Customer.prototype.delete = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._delete(headers);
    };
    Customer.ressourceName = 'customer';
    return Customer;
}(Resource_1.Resource));
exports.Customer = Customer;
