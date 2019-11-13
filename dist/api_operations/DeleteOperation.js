"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeleteOperation = /** @class */ (function () {
    function DeleteOperation() {
    }
    /**
     * Send delete resource request
     * @param {Object|null} headers
     * @returns {Promise<FedaPayObject>}
     */
    DeleteOperation.prototype._delete = function (headers) {
        var _this = this;
        var url = this.instanceUrl();
        return Resource._staticRequest('delete', url, [], headers)
            .then(function (_a) {
            var data = _a.data, options = _a.options;
            return _this;
        });
    };
    return DeleteOperation;
}());
exports.DeleteOperation = DeleteOperation;
