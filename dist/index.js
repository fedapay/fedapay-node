"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
exports.FEDAPAY = 'FEDAPAY';
function sendRequest() {
    request({
        // will be ignored
        method: 'GET',
        uri: 'https://www.booknomads.com/api/v0/isbn/9789000035526',
    }, function (error, response, body) {
        console.log(error, response, body);
    });
}
exports.sendRequest = sendRequest;
