"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var config_constants_1 = require("./config.constants");
var network_1 = require("./network/network");
var WebService = /** @class */ (function () {
    function WebService() {
        var _this = this;
        this.isBusy = false;
        this.generations = 0;
        this.ws = new WebSocket.Server({ port: config_constants_1.SERVER.PORT });
        console.log("Server estabilished! Wait for client");
        this.ws.on('connection', function (w) {
            w.on('message', function (m) {
                var msg = JSON.parse(m);
                switch (msg.type) {
                    case 1:
                        if (!_this.isBusy) {
                            console.log("Client connected!");
                            _this.isBusy = true;
                            var ms = { width: config_constants_1.SIZE.WIDTH, height: config_constants_1.SIZE.HEIGHT };
                            _this.net = new network_1["default"](ms);
                            w.send(JSON.stringify({ type: 1, data: ms }));
                        }
                        break;
                    case 2:
                        w.send(JSON.stringify({ type: 2, data: { snake: _this.net.train_single(), generations: _this.generations } }));
                        _this.generations++;
                        if (_this.generations === config_constants_1.ALGORITHM.GENERATIONS)
                            _this.ws.close();
                        break;
                }
                ;
            });
            w.on('close', function (m) {
                _this.net = {};
                _this.generations = 0;
                _this.isBusy = false;
                console.log('Client disconnected!');
                return;
            });
        });
    }
    return WebService;
}());
exports.WebService = WebService;
