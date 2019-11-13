"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var UpdateOperation = /** @class */ (function () {
    function UpdateOperation() {
    }
    /**
     * Send create resource request
     * @param {string|number} id
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    UpdateOperation.update = function (id, params, headers) {
        this._validateParams(params);
        var url = this.resourcePath(id);
        var className = this.className();
        return this._staticRequest('put', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = Util_1.arrayToFedaPayObject(data, options);
            return object[className];
        });
    };
    return UpdateOperation;
}());
exports.UpdateOperation = UpdateOperation;
