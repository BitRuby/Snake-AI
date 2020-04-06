"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var config_constants_1 = require("./config.constants");
var WebService = /** @class */ (function () {
    function WebService() {
        this.ws = new WebSocket.Server({ port: config_constants_1.SERVER.PORT });
        console.log("Server estabilished! Wait for client");
        this.ws.on('connection', function (w) {
            w.on('message', function (m) {
                var msg = JSON.parse(m);
                switch (msg.type) {
                    case 1:
                        console.log("Client connected!");
                        break;
                    case 2:
                        break;
                }
                ;
            });
            w.on('close', function (m) {
            });
        });
    }
    return WebService;
}());
exports.WebService = WebService;
