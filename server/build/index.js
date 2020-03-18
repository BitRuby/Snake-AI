"use strict";

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ws = new _ws["default"].Server({
  port: 8080
});
console.log(ws);