"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureCompare = exports.toDateString = exports.stripApiVersion = exports.arrayToFedaPayObject = exports.convertToFedaPayObject = void 0;
var crypto = require("crypto");
var FedaPayObject_1 = require("./FedaPayObject");
/**
 * Convert response to FedaPayObject
 * @param {any} resp
 * @param {any} opts
 */
function convertToFedaPayObject(resp, opts) {
    var types = {
        'v1/api_key': require('./ApiKey').ApiKey,
        'v1/account': require('./Account').Account,
        'v1/currency': require('./Currency').Currency,
        'v1/customer': require('./Customer').Customer,
        'v1/event': require('./Event').Event,
        'v1/log': require('./Log').Log,
        'v1/phone_number': require('./PhoneNumber').PhoneNumber,
        'v1/transaction': require('./Transaction').Transaction,
        'v1/payout': require('./Payout').Payout,
        'v1/webhook': require('./Webhook').Webhook,
        'v1/balance': require('./Balance').Balance,
    };
    var object = new FedaPayObject_1.FedaPayObject;
    if (resp['klass']) {
        var klass = resp['klass'];
        if (types[klass]) {
            object = new types[klass]();
        }
    }
    object.refreshFrom(resp, opts);
    return object;
}
exports.convertToFedaPayObject = convertToFedaPayObject;
/**
 * Convert array response to FedaPayObject
 * @param {any} array
 * @param {any} opts
 */
function arrayToFedaPayObject(array, opts) {
    if (Array.isArray(array)) {
        var mapped_1 = [];
        array.forEach(function (i) {
            mapped_1.push(convertToFedaPayObject(i, opts));
        });
        return mapped_1;
    }
    else {
        return convertToFedaPayObject(array, opts);
    }
}
exports.arrayToFedaPayObject = arrayToFedaPayObject;
/**
 * Strip api version from key
 * @param {any} key
 * @param {any} opts
 */
function stripApiVersion(key, opts) {
    var apiPart = '';
    if (opts.apiVersion) {
        apiPart = "".concat(opts.apiVersion, "/");
    }
    return key.replace(apiPart, '');
}
exports.stripApiVersion = stripApiVersion;
/**
 * Check a date falue
 * @param mixed $date
 * @return mixed
 */
function toDateString(date) {
    if (date instanceof Date) {
        return date.toISOString();
    }
    else if (typeof date == 'string' || typeof date == 'number') {
        return date;
    }
    else {
        throw new Error('Invalid datetime argument. Should be a date in string format, ' +
            ' a timestamp  or an instance of Date.');
    }
}
exports.toDateString = toDateString;
/**
   * Secure compare, from https://github.com/freewil/scmp
   */
function secureCompare(a, b) {
    a = Buffer.from(a);
    b = Buffer.from(b);
    // return early here if buffer lengths are not equal since timingSafeEqual
    // will throw if buffer lengths are not equal
    if (a.length !== b.length) {
        return false;
    }
    // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
    // otherwise use our own scmp-internal function.
    if (crypto.timingSafeEqual) {
        return crypto.timingSafeEqual(a, b);
    }
    var len = a.length;
    var result = 0;
    for (var i = 0; i < len; ++i) {
        result |= a[i] ^ b[i];
    }
    return result === 0;
}
exports.secureCompare = secureCompare;
