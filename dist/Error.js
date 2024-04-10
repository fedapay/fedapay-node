"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureVerificationError = exports.InvalidRequest = exports.ApiConnectionError = exports.Base = void 0;
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
    /**
     * Return true if response has error
     * @returns {boolean}
     */
    Base.prototype.hasErrors = function () {
        return this.errors !== undefined && this.errors !== null;
    };
    /**
     * Fetch error from response body
     * @returns {void}
     */
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
var SignatureVerificationError = /** @class */ (function (_super) {
    __extends(SignatureVerificationError, _super);
    function SignatureVerificationError(message, sigHeader, httpBody) {
        if (sigHeader === void 0) { sigHeader = null; }
        if (httpBody === void 0) { httpBody = null; }
        var _this = _super.call(this, message, null, null, httpBody) || this;
        _this.sigHeader = sigHeader;
        return _this;
    }
    return SignatureVerificationError;
}(Base));
exports.SignatureVerificationError = SignatureVerificationError;
