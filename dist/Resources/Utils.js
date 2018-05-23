"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function stripApiVersion(key, opts) {
    var apiPart = '';
    var apiVersion = opts['apiVersion'];
    if (Array.isArray(opts) && apiVersion) {
        apiPart = apiVersion + "/";
    }
    return key.replace(apiPart, '');
}
exports.stripApiVersion = stripApiVersion;
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
function objectToFedaPayObject(attrs, opts, className) {
    if (attrs === void 0) { attrs = {}; }
    if (opts === void 0) { opts = {}; }
    // klass
    // if array make a loop
    var objects = [];
    switch (className) {
        case 'currency':
            objects.push(new __1.Currency(attrs));
    }
    return objects;
}
exports.objectToFedaPayObject = objectToFedaPayObject;
function convertToFedaPayObject(resp, opts) {
    var types = {
        'v1/api_key': 'FedaPay\\ApiKey',
        'v1/account': 'FedaPay\\Account',
        'v1/currency': 'FedaPay\\Currency',
        'v1/customer': 'FedaPay\\Customer',
        'v1/event': 'FedaPay\\Event',
        'v1/event_type': 'FedaPay\\EventType',
        'v1/invitation': 'FedaPay\\Invitation',
        'v1/log': 'FedaPay\\Log',
        'v1/role': 'FedaPay\\Role',
        'v1/setting': 'FedaPay\\Setting',
        'v1/transaction': 'FedaPay\\Transaction',
        'v1/user': 'FedaPay\\User',
    };
    var kklass = __1.FedaPayObject;
    if (resp['klass']) {
        var klass = resp['klass'];
        /* if (types.klass) {
            let kklass = types.klass;
        } */
    }
    var object = new kklass;
    object.refreshFrom(resp, opts);
    return object;
}
exports.convertToFedaPayObject = convertToFedaPayObject;
function isList(array) {
    if (!Array.isArray(array))
        return false;
    array.map(function (key, value) {
        if (!isNumeric(key))
            return false;
    });
    return true;
}
exports.isList = isList;
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
