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
exports.Payout = void 0;
var _1 = require(".");
var Util_1 = require("./Util");
/**
 * Class Payout
 *
 * @property int $id
 * @property string $reference
 * @property string $amount
 * @property string $status
 * @property int $customer_id
 * @property int $balance_id
 * @property string $mode
 * @property int $last_error_code
 * @property string $last_error_message
 * @property string $created_at
 * @property string $updated_at
 * @property string $scheduled_at
 * @property string $sent_at
 * @property string $failed_at
 * @property string $deleted_at
 */
var Payout = /** @class */ (function (_super) {
    __extends(Payout, _super);
    function Payout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a payout
     *
     * @param {Object|null} params
     * @param headers
     */
    Payout.create = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._create(params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Payout.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Payout>}
     */
    Payout.retrieve = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._retrieve(id, params, headers);
    };
    /**
     * @param {string|number} id string The ID of the Payout to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Payout>}
     */
    Payout.update = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._update(id, params, headers);
    };
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Payout>} The saved Payout.
     */
    Payout.prototype.save = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._save(headers);
    };
    /**
     * @param {array} $headers
     * @returns Payout The deleted Payout.
     */
    Payout.prototype.delete = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._delete(headers);
    };
    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<Payout>}
     */
    Payout.prototype._start = function (params, headers) {
        var _this = this;
        var path = Payout.resourcePath('start');
        return Payout._staticRequest('put', path, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            _this.refreshFrom(object['payouts'][0], options);
            return _this;
        });
    };
    /**
     * @param {any} params
     * @param {any} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Payout._startAll = function (params, headers) {
        var path = this.resourcePath('start');
        return this._staticRequest('put', path, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return (0, Util_1.arrayToFedaPayObject)(data, options);
        });
    };
    /**
     * Send the payout now
     *
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    Payout.prototype.sendNow = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var _params = {
            payouts: [{
                    id: this.id
                }]
        };
        params = Object.assign(_params, params);
        return this._start(params, headers);
    };
    /**
     * Start the payout
     * @param {Date|string|number} scheduled_at
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<Payout>} The saved Payout.
     */
    Payout.prototype.schedule = function (scheduled_at, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        scheduled_at = (0, Util_1.toDateString)(scheduled_at);
        var _params = {
            payouts: [{
                    id: this.id,
                    scheduled_at: scheduled_at
                }]
        };
        params = Object.assign(_params, params);
        return this._start(params, headers);
    };
    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Payout.scheduleAll = function (payouts, params, headers) {
        if (payouts === void 0) { payouts = []; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var items = [];
        payouts.forEach(function (payout) {
            var item = {};
            if (!payout['id']) {
                throw new Error('Invalid id argument. You must specify payout id.');
            }
            item['id'] = payout['id'];
            if (payout['scheduled_at']) {
                item['scheduled_at'] = (0, Util_1.toDateString)(payout['scheduled_at']);
            }
            items.push(item);
        });
        var _params = {
            payouts: items
        };
        params = Object.assign(_params, params);
        return this._startAll(params, headers);
    };
    /**
     * Start a scheduled payout
     *
     * @param {array} payouts
     * @param {array|string|null} params
     * @param {array|string|null} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Payout.sendAllNow = function (payouts, params, headers) {
        if (payouts === void 0) { payouts = []; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var items = [];
        payouts.forEach(function (payout) {
            var item = {};
            if (!payout['id']) {
                throw new Error('Invalid id argument. You must specify payout id.');
            }
            item['id'] = payout['id'];
            items.push(item);
        });
        var _params = {
            payouts: items
        };
        params = Object.assign(_params, params);
        return this._startAll(params, headers);
    };
    Payout.ressourceName = 'payout';
    return Payout;
}(_1.Resource));
exports.Payout = Payout;
