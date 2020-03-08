/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.config.json":
/*!******************************!*\
  !*** ./src/game.config.json ***!
  \******************************/
/*! exports provided: pixelSize, gameSpeed, backgroundColor, snakeColor, borderColor, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"pixelSize\":60,\"gameSpeed\":100,\"backgroundColor\":\"#636e72\",\"snakeColor\":\"#fff\",\"borderColor\":\"#2d3436\"}");

/***/ }),

/***/ "./src/game/food.js":
/*!**************************!*\
  !*** ./src/game/food.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Food = function Food(snakeRef) {
  var _this = this;

  _classCallCheck(this, Food);

  _defineProperty(this, "position", {});

  _defineProperty(this, "getPosition", function () {
    return _this.position;
  });

  this.snakeRef = snakeRef;
  this.snakeRef.ctx.fillStyle = "#ff4757";

  for (;;) {
    this.position = {
      x: (Math.floor(Math.random() * (this.snakeRef.columns - 2)) + 1) * this.snakeRef.px,
      y: (Math.floor(Math.random() * (this.snakeRef.rows - 2)) + 1) * this.snakeRef.px
    };

    if (!this.snakeRef.containsCoordinates(this.position.x, this.position.y)) {
      break;
    }
  }

  this.snakeRef.ctx.fillRect(this.position.x, this.position.y, snakeRef.px, snakeRef.px);
};

/* harmony default export */ __webpack_exports__["default"] = (Food);

/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ "./src/game/snake.js");
/* harmony import */ var _game_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.config.json */ "./src/game.config.json");
var _game_config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../game.config.json */ "./src/game.config.json", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Game = function Game(_c) {
  var _this = this;

  _classCallCheck(this, Game);

  _defineProperty(this, "createMap", function () {
    var px = _this.px,
        ctx = _this.ctx,
        columns = _this.columns,
        rows = _this.rows;
    ctx.fillStyle = _game_config_json__WEBPACK_IMPORTED_MODULE_1__.borderColor;
    ctx.fillRect(0, 0, px * columns, px);
    ctx.fillRect(0, 0, px, px * rows);
    ctx.fillRect(px * (columns - 1), 0, px, px * rows);
    ctx.fillRect(0, px * (rows - 1), px * columns, px);
  });

  _defineProperty(this, "start", function () {
    var createMap = _this.createMap,
        speed = _this.speed,
        c = _this.c;
    createMap();
    var snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"](c);
    window.addEventListener("keydown", function (key) {
      var direction = key.key.replace("Arrow", "");
      if ((direction === "Right" || direction === "Left" || direction === "Up" || direction === "Down") && direction !== snake.turnDirection()) snake.changeDirection(direction);
    });
    _this.interval = window.setInterval(function () {
      snake.drawSnake(_this.interval);
    }, speed);
  });

  this.px = _game_config_json__WEBPACK_IMPORTED_MODULE_1__.pixelSize;
  this.speed = _game_config_json__WEBPACK_IMPORTED_MODULE_1__.gameSpeed;
  _c.style.backgroundColor = _game_config_json__WEBPACK_IMPORTED_MODULE_1__.backgroundColor;
  this.rows = _c.height / this.px;
  this.columns = _c.width / this.px;
  this.ctx = _c.getContext("2d");
  this.c = _c;
  this.interval = {};
};

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/game/snake.js":
/*!***************************!*\
  !*** ./src/game/snake.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game.config.json */ "./src/game.config.json");
var _game_config_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../game.config.json */ "./src/game.config.json", 1);
/* harmony import */ var _food_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food.js */ "./src/game/food.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Snake = function Snake(c) {
  var _this = this;

  _classCallCheck(this, Snake);

  _defineProperty(this, "isDie", function () {
    return _this.die;
  });

  _defineProperty(this, "getPoints", function () {
    return _this.points;
  });

  _defineProperty(this, "getDirection", function () {
    return _this.direction;
  });

  _defineProperty(this, "turnDirection", function () {
    switch (_this.direction) {
      case "Up":
        return "Down";

      case "Down":
        return "Up";

      case "Left":
        return "Right";

      case "Right":
        return "Left";
    }
  });

  _defineProperty(this, "changeDirection", function (d) {
    _this.direction = d;
  });

  _defineProperty(this, "containsCoordinates", function (x, y) {
    return _this.snake.some(function (e) {
      return e.x === x && e.y === y;
    });
  });

  _defineProperty(this, "drawSnake", function (interval) {
    var px = _this.px,
        ctx = _this.ctx,
        snake = _this.snake,
        update = _this.update,
        die = _this.die;
    update();

    if (die.statement) {
      clearInterval(interval);
      return;
    }

    ctx.fillStyle = _game_config_json__WEBPACK_IMPORTED_MODULE_0__.snakeColor;
    ctx.strokeStyle = _game_config_json__WEBPACK_IMPORTED_MODULE_0__.backgroundColor;
    snake.map(function (e) {
      ctx.fillRect(e.x, e.y, px, px);
      ctx.strokeRect(e.x, e.y, px, px);
    });
  });

  _defineProperty(this, "isCollected", function () {
    if (_this.food.getPosition().x === _this.snake[0].x && _this.food.getPosition().y === _this.snake[0].y) {
      _this.food = new _food_js__WEBPACK_IMPORTED_MODULE_1__["default"](_this);
      _this.points += 1;
      console.log(_this.points);
      return true;
    } else return false;
  });

  _defineProperty(this, "update", function () {
    var direction = _this.direction,
        die = _this.die,
        snake = _this.snake,
        px = _this.px,
        columns = _this.columns,
        rows = _this.rows,
        ctx = _this.ctx;

    switch (direction) {
      case "Up":
        if (snake[0].y - px > 0) ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, px, px);
        if (_this.containsCoordinates(snake[0].x, snake[0].y - px)) die.statement = true;
        snake.unshift({
          x: snake[0].x,
          y: snake[0].y - px
        });
        _this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].y <= 0) die.statement = true;
        break;

      case "Down":
        if (snake[0].y + px < (rows - 1) * px) ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, px, px);
        if (_this.containsCoordinates(snake[0].x, snake[0].y + px)) die.statement = true;
        snake.unshift({
          x: snake[0].x,
          y: snake[0].y + px
        });
        _this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].y >= (rows - 1) * px) die.statement = true;
        break;

      case "Left":
        if (snake[0].x - px > 0) ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, px, px);
        if (_this.containsCoordinates(snake[0].x - px, snake[0].y)) die.statement = true;
        snake.unshift({
          x: snake[0].x - px,
          y: snake[0].y
        });
        _this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].x <= 0) die.statement = true;
        break;

      case "Right":
        if (snake[0].x + px < (columns - 1) * px) ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, px, px);
        if (_this.containsCoordinates(snake[0].x + px, snake[0].y)) die.statement = true;
        snake.unshift({
          x: snake[0].x + px,
          y: snake[0].y
        });
        _this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].x >= (columns - 1) * px) die.statement = true;
        break;

      default:
    }
  });

  this.px = _game_config_json__WEBPACK_IMPORTED_MODULE_0__.pixelSize;
  this.snake = [{
    x: this.px,
    y: this.px
  }];
  this.direction = "Right";
  this.points = 0;
  this.die = {
    statement: false
  };
  this.length = 1;
  this.rows = c.height / this.px;
  this.columns = c.width / this.px;
  this.ctx = c.getContext("2d");
  this.food = new _food_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
};

/* harmony default export */ __webpack_exports__["default"] = (Snake);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game */ "./src/game/game.js");


var main = function main() {
  var c = document.getElementById("canvas");
  new _game_game__WEBPACK_IMPORTED_MODULE_0__["default"](c).start();
};

main();

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map