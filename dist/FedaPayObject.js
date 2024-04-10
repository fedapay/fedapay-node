"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FedaPayObject = void 0;
var isPlainObject = require("lodash.isplainobject");
var Util_1 = require("./Util");
/**
 * Class FedaPayObject
 */
var FedaPayObject = /** @class */ (function () {
    function FedaPayObject(id, opts) {
        if (id === void 0) { id = null; }
        if (opts === void 0) { opts = null; }
        if (id !== null && typeof id === 'object') {
            this.refreshFrom(id, opts);
        }
        else if (id !== null) {
            this.id = id;
        }
    }
    /**
     * Refresh object from values
     * @param {any} values
     * @param {any} opts
     */
    FedaPayObject.prototype.refreshFrom = function (values, opts) {
        for (var k in values) {
            var value = values[k];
            if (isPlainObject(value) || Array.isArray(value)) {
                k = (0, Util_1.stripApiVersion)(k, opts);
                this[k] = (0, Util_1.arrayToFedaPayObject)(value, opts);
            }
            else {
                this[k] = value;
            }
        }
    };
    /**
     * Serialize object
     * @returns {Object}
     */
    FedaPayObject.prototype.serializeParameters = function () {
        var params = {};
        for (var key in this) {
            if (key == 'id')
                continue;
            var value = this[key];
            if (value instanceof FedaPayObject) {
                var serialized = value.serializeParameters();
                if (serialized) {
                    params[key] = serialized;
                }
            }
            else if (typeof value !== 'function') {
                params[key] = value;
            }
        }
        return params;
    };
    return FedaPayObject;
}());
exports.FedaPayObject = FedaPayObject;
