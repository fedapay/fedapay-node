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
var Resource_1 = require("./Resource");
/**
 * Class PhoneNumber
 *
 * @property int $id
 * @property string $number
 * @property string $country
 * @property string $created_at
 * @property string $updated_at
 *
 * @package FedaPay
 */
var PhoneNumber = /** @class */ (function (_super) {
    __extends(PhoneNumber, _super);
    function PhoneNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PhoneNumber;
}(Resource_1.Resource));
exports.PhoneNumber = PhoneNumber;
