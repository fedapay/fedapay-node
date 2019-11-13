"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util");
var CreateOperation = /** @class */ (function () {
    function CreateOperation() {
    }
    /**
     * Send create resource request
     * @param {Object|null} params
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    CreateOperation.create = function (params, headers) {
        this._validateParams(params);
        var url = this.classPath();
        var className = this.className();
        return this._staticRequest('post', url, params, headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            var object = Util_1.arrayToFedaPayObject(data, options);
            return object[className];
        });
    };
    return CreateOperation;
}());
exports.CreateOperation = CreateOperation;
