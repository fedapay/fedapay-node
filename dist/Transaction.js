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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.Transaction = void 0;
var _1 = require(".");
var Error_1 = require("./Error");
var Util_1 = require("./Util");
/**
 * Class Transaction
 *
 * @property int $id
 * @property string $reference
 * @property string $description
 * @property string $callback_url
 * @property string $amount
 * @property string $status
 * @property int $transaction_id
 * @property string $created_at
 * @property string $updated_at
 */
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Check the transaction mode for send now request
     *
     * @param {string} mode
     * @return {boolean}
     */
    Transaction.prototype.mobileMoneyModeAvailable = function (mode) {
        return Transaction.AVAILABLE_MOBILE_MONEY.includes(mode);
    };
    /**
     * Check if the transaction was paid
     *
     * @return {boolean}
     */
    Transaction.prototype.wasPaid = function () {
        return Transaction.PAID_STATUS.includes(this.status);
    };
    /**
     * Check if the transacton was refunded. Status must include refunded.
     *
     * @return {boolean}
     */
    Transaction.prototype.wasRefunded = function () {
        return this.status.includes('refunded');
    };
    /**
     * Check if the transacton was partially refunded. Status must include partially_refunded.
     *
     * @return {boolean}
     */
    Transaction.prototype.wasPartiallyRefunded = function () {
        return this.status.includes('partially_refunded');
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    Transaction.create = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._create(params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Transaction.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Transaction>}
     */
    Transaction.retrieve = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._retrieve(id, params, headers);
    };
    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Transaction>}
     */
    Transaction.update = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._update(id, params, headers);
    };
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Transaction>} The saved transaction.
     */
    Transaction.prototype.save = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._save(headers);
    };
    /**
     * @param {array} $headers
     * @returns Transaction The deleted transaction.
     */
    Transaction.prototype.delete = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._delete(headers);
    };
    /**
     * Generate token
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    Transaction.prototype.generateToken = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var url = this.instanceUrl() + '/token';
        return Transaction._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object;
        });
    };
    /**
     * Send Mobile Money request with token
     * @param {string} mode
     * @param {string} token
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Transaction.prototype.sendNowWithToken = function (mode, token, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        if (!this.mobileMoneyModeAvailable(mode)) {
            throw new Error_1.InvalidRequest("Invalid payment method '".concat(mode, "' supplied.\n                You have to use one of the following payment methods\n                [").concat(Transaction.AVAILABLE_MOBILE_MONEY.join(','), "]"));
        }
        var url = '/' + mode;
        params.token = token;
        return Transaction._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object;
        });
    };
    /**
     * Send Mobile Money request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Transaction.prototype.sendNow = function (mode, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateToken({}, headers)];
                    case 1:
                        tokenObject = _a.sent();
                        return [2 /*return*/, this.sendNowWithToken(mode, tokenObject.token, params, headers)];
                }
            });
        });
    };
    /**
     * Send fees request
     * @param string mode
     * @param {Object} params
     * @param {Object} headers
     *
     * @returns {Promise<FedaPayObject>}
     */
    Transaction.prototype.getFees = function (token, mode, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = Transaction.classPath() + '/fees';
                params.token = token;
                params.mode = mode;
                return [2 /*return*/, Transaction._staticRequest('get', url, params, headers)
                        .then(function (_a) {
                        var data = _a.data, options = _a.options;
                        var object = (0, Util_1.arrayToFedaPayObject)(data, options);
                        return object;
                    })];
            });
        });
    };
    Transaction.ressourceName = 'transaction';
    /**
     * Available mobile money mode
     */
    Transaction.AVAILABLE_MOBILE_MONEY = [
        'mtn', 'moov', 'mtn_ci', 'moov_tg', 'togocel', 'mtn_open'
    ];
    Transaction.PAID_STATUS = [
        'approved', 'transferred', 'refunded',
        'approved_partially_refunded', 'transferred_partially_refunded'
    ];
    return Transaction;
}(_1.Resource));
exports.Transaction = Transaction;
