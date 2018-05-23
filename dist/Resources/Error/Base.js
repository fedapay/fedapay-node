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
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base(message, httpStatus, httpRequest, httpResponse) {
        if (httpStatus === void 0) { httpStatus = null; }
        if (httpRequest === void 0) { httpRequest = null; }
        if (httpResponse === void 0) { httpResponse = null; }
        var _this = _super.call(this, message) || this;
        _this.httpStatus = httpStatus;
        _this.httpRequest = httpRequest;
        _this.httpResponse = httpResponse;
        return _this;
    }
    Base.prototype.getHttpStatus = function () {
        return this.httpStatus;
    };
    Base.prototype.getHttpRequest = function () {
        return this.httpRequest;
    };
    Base.prototype.getHttpResponse = function () {
        return this.httpResponse;
    };
    Base.prototype.getErrorMessage = function () {
        return this.errorMessage;
    };
    Base.prototype.getErrors = function () {
        return this.errors;
    };
    Base.prototype.hasErrors = function () {
        return !this.errors;
    };
    return Base;
}(Error));
exports.Base = Base;
