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
exports.WebhookSignature = exports.Webhook = void 0;
var crypto = require("crypto");
var _1 = require(".");
var Error_1 = require("./Error");
var Util_1 = require("./Util");
/**
 * Class Webhook
 *
 * @property int $id
 * @property string $url
 * @property string $created_at
 * @property string $updated_at
 */
var Webhook = /** @class */ (function (_super) {
    __extends(Webhook, _super);
    function Webhook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Webhook.constructEvent = function (payload, header, secret, tolerance) {
        WebhookSignature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE);
        var jsonPayload = JSON.parse(payload);
        return jsonPayload;
    };
    /**
   * Generates a header to be used for webhook mocking
   *
   * @typedef {object} opts
   * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
   * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
   * @property {string} secret - FedaPay webhook secret 'wh_...'
   * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
   * @property {string} signature - Computed webhook signature
   */
    Webhook.generateTestHeaderString = function (opts) {
        if (!opts) {
            throw new Error_1.Base('Options are required');
        }
        opts.timestamp =
            Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
        opts.scheme = opts.scheme || WebhookSignature.EXPECTED_SCHEME;
        opts.signature =
            opts.signature ||
                WebhookSignature.computeSignature(opts.timestamp + '.' + opts.payload, opts.secret);
        var generatedHeader = [
            't=' + opts.timestamp,
            opts.scheme + '=' + opts.signature,
        ].join(',');
        return generatedHeader;
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<Webhook>}
     */
    Webhook.create = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._create(params, headers);
    };
    /**
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    Webhook.all = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._all(params, headers);
    };
    /**
     * @param {string|number} id
     * @param {Object|null} headers
     * @returns {Promise<Webhook>}
     */
    Webhook.retrieve = function (id, headers) {
        if (headers === void 0) { headers = {}; }
        return this._retrieve(id, headers);
    };
    /**
     * @param {string|number} id string The ID of the transaction to update.
     * @param {object|null} params
     * @param {object|null} headers
     *
     * @returns {Promise<Webhook>}
     */
    Webhook.update = function (id, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._update(id, params, headers);
    };
    /**
     * @param {array|string|null} $headers
     * @returns {Promise<Webhook>} The saved transaction.
     */
    Webhook.prototype.save = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._save(headers);
    };
    /**
     * @param {array} $headers
     * @returns Webhook The deleted transaction.
     */
    Webhook.prototype.delete = function (headers) {
        if (headers === void 0) { headers = {}; }
        return this._delete(headers);
    };
    /**
     * Stub Event
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    Webhook.stubEvent = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var url = this.classPath() + '/stub_event';
        return Webhook._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object;
        });
    };
    /**
     * Send astubbed event to the webhook
     * @param {Object} params
     * @param {Object} headers
     * @returns {Promise<FedaPayObject>}
     */
    Webhook.prototype.sendEvent = function (params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var url = this.instanceUrl() + '/send_event';
        return Webhook._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = (0, Util_1.arrayToFedaPayObject)(data, options);
            return object;
        });
    };
    Webhook.ressourceName = 'webhook';
    Webhook.DEFAULT_TOLERANCE = 300; // 5 minutes
    return Webhook;
}(_1.Resource));
exports.Webhook = Webhook;
var WebhookSignature = /** @class */ (function () {
    function WebhookSignature() {
    }
    WebhookSignature.computeSignature = function (payload, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');
    };
    WebhookSignature.parseHeader = function (header, scheme) {
        if (typeof header !== 'string') {
            return null;
        }
        return header.split(',').reduce(function (accum, item) {
            var kv = item.split('=');
            if (kv[0] === 't') {
                accum.timestamp = parseInt(kv[1]);
            }
            if (kv[0] === scheme) {
                accum.signatures.push(kv[1]);
            }
            return accum;
        }, { timestamp: -1, signatures: [] });
    };
    WebhookSignature.verifyHeader = function (payload, header, secret, tolerance) {
        payload = Buffer.isBuffer(payload) ? payload.toString('utf8') : payload;
        header = Buffer.isBuffer(header) ? header.toString('utf8') : header;
        var details = this.parseHeader(header, this.EXPECTED_SCHEME);
        if (!details || details.timestamp === -1) {
            throw new Error_1.SignatureVerificationError('Unable to extract timestamp and signatures from header', header, payload);
        }
        if (!details.signatures.length) {
            throw new Error_1.SignatureVerificationError('No signatures found with expected scheme', header, payload);
        }
        var expectedSignature = this.computeSignature("".concat(details.timestamp, ".").concat(payload), secret);
        var signatureFound = !!details.signatures
            .find(function (v) { return (0, Util_1.secureCompare)(v, expectedSignature); });
        if (!signatureFound) {
            throw new Error_1.SignatureVerificationError('No signatures found matching the expected signature for payload.' +
                ' Are you passing the raw request body you received from FedaPay?' +
                ' https://github.com/fedapay/fedapay-node#webhook-signing', header, payload);
        }
        var timestampAge = Math.floor(Date.now() / 1000) - details.timestamp;
        if (tolerance && tolerance > 0 && timestampAge > tolerance) {
            throw new Error_1.SignatureVerificationError('Timestamp outside the tolerance zone', header, payload);
        }
        return true;
    };
    WebhookSignature.EXPECTED_SCHEME = 's';
    return WebhookSignature;
}());
exports.WebhookSignature = WebhookSignature;
