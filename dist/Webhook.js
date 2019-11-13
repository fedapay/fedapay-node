"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Webhook = /** @class */ (function () {
    function Webhook() {
    }
    Webhook.constructEvent = function (payload, header, secret, tolerance) {
        this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE);
        var jsonPayload = JSON.parse(payload);
        return jsonPayload;
    };
    return Webhook;
}());
exports.Webhook = Webhook;
var WebhookSignature = /** @class */ (function () {
    function WebhookSignature() {
    }
    WebhookSignature.prototype._computeSignature = function (payload, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');
    };
    WebhookSignature.prototype.parseHeader = function (header, scheme) {
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
    WebhookSignature.prototype.verifyHeader = function (payload, header, secret, tolerance) {
        payload = Buffer.isBuffer(payload) ? payload.toString('utf8') : payload;
        header = Buffer.isBuffer(header) ? header.toString('utf8') : header;
        var details = parseHeader(header, this.EXPECTED_SCHEME);
        if (!details || details.timestamp === -1) {
            throw new Error.StripeSignatureVerificationError({
                message: 'Unable to extract timestamp and signatures from header',
                detail: {
                    header: header,
                    payload: payload,
                },
            });
        }
        if (!details.signatures.length) {
            throw new Error.StripeSignatureVerificationError({
                message: 'No signatures found with expected scheme',
                detail: {
                    header: header,
                    payload: payload,
                },
            });
        }
        var expectedSignature = this._computeSignature(details.timestamp + "." + payload, secret);
        var signatureFound = !!details.signatures.filter(utils.secureCompare.bind(utils, expectedSignature)).length;
        if (!signatureFound) {
            throw new Error.StripeSignatureVerificationError({
                message: 'No signatures found matching the expected signature for payload.' +
                    ' Are you passing the raw request body you received from Stripe?' +
                    ' https://github.com/stripe/stripe-node#webhook-signing',
                detail: {
                    header: header,
                    payload: payload,
                },
            });
        }
        var timestampAge = Math.floor(Date.now() / 1000) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
            throw new Error.StripeSignatureVerificationError({
                message: 'Timestamp outside the tolerance zone',
                detail: {
                    header: header,
                    payload: payload,
                },
            });
        }
        return true;
    };
    return WebhookSignature;
}());
exports.WebhookSignature = WebhookSignature;
