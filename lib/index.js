"use strict";

var _Game = _interopRequireDefault(require("./game/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var main = function main() {
  var c = document.getElementById("canvas");
  var game = new _Game["default"](c);
  game.start();
};

main();