"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookSignature = exports.Webhook = void 0;
var crypto = require("crypto");
var Error_1 = require("./Error");
var Util_1 = require("./Util");
var Webhook = /** @class */ (function () {
    function Webhook() {
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
    Webhook.DEFAULT_TOLERANCE = 300; // 5 minutes
    return Webhook;
}());
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
        var expectedSignature = this.computeSignature(details.timestamp + "." + payload, secret);
        var signatureFound = !!details.signatures
            .find(function (v) { return Util_1.secureCompare(v, expectedSignature); });
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
