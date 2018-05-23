"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var FedaPayObject = /** @class */ (function () {
    function FedaPayObject(id, opts) {
        if (id === void 0) { id = null; }
        if (opts === void 0) { opts = null; }
        this.values = [];
        if (id !== null && typeof id === 'object') {
            this.refreshFrom(id, opts);
        }
        else if (id !== null) {
            this.id = id;
        }
    }
    FedaPayObject.prototype.refreshFrom = function (values, opts) {
        for (var k in values) {
            var value = values[k];
            if (value !== null && typeof value === 'object') {
                k = Utils_1.stripApiVersion(k, opts);
                this[k] = Utils_1.arrayToFedaPayObject(value, opts);
            }
            else {
                this[k] = value;
            }
        }
    };
    FedaPayObject.prototype.serializeParameters = function () {
        var params = {};
        for (var key in this.values) {
            if (key == 'id')
                continue;
            var value = this.values[key];
            if (value instanceof FedaPayObject) {
                var serialized = value.serializeParameters();
                if (serialized) {
                    //                    params[key] = serialized;
                }
            }
            else {
                //                params[key] = value;
            }
        }
    };
    return FedaPayObject;
}());
exports.FedaPayObject = FedaPayObject;
