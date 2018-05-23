"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize = require('pluralize');
var Inflector = /** @class */ (function () {
    function Inflector() {
    }
    Inflector.pluralize = function (word) {
        return pluralize(word);
    };
    return Inflector;
}());
exports.Inflector = Inflector;
