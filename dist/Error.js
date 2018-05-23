"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base(message, httpStatus, httpRequest, httpResponse) {
        if (httpStatus === void 0) { httpStatus = null; }
        if (httpRequest === void 0) { httpRequest = null; }
        if (httpResponse === void 0) { httpResponse = null; }
        this.message = message;
        this.httpStatus = httpStatus;
        this.httpRequest = httpRequest;
        this.httpResponse = httpResponse;
        this.fetchErrors();
    }
    Base.prototype.hasErrors = function () {
        return this.errors !== undefined && this.errors !== null;
    };
    Base.prototype.fetchErrors = function () {
        if (this.httpResponse) {
            var data = this.httpResponse.data;
            if (data && data['message']) {
                this.errorMessage = data['message'];
            }
            if (data && data['errors']) {
                this.errors = data['errors'];
            }
        }
    };
    return Base;
}());
exports.Base = Base;
var ApiConnectionError = /** @class */ (function (_super) {
    __extends(ApiConnectionError, _super);
    function ApiConnectionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApiConnectionError;
}(Base));
exports.ApiConnectionError = ApiConnectionError;
var InvalidRequest = /** @class */ (function (_super) {
    __extends(InvalidRequest, _super);
    function InvalidRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidRequest;
}(Base));
exports.InvalidRequest = InvalidRequest;
