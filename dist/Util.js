"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FedaPayObject_1 = require("./FedaPayObject");
function convertToFedaPayObject(resp, opts) {
    var types = {
        'v1/account': require('./Account').Account,
        'v1/currency': require('./Currency').Currency,
        'v1/customer': require('./Customer').Customer,
        'v1/event': require('./Event').Event,
        'v1/log': require('./Log').Log,
        'v1/transaction': require('./Transaction').Transaction,
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
function stripApiVersion(key, opts) {
    var apiPart = '';
    if (opts.apiVersion) {
        apiPart = opts.apiVersion + "/";
    }
    return key.replace(apiPart, '');
}
exports.stripApiVersion = stripApiVersion;
