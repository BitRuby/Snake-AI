"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var population_1 = require("./genetic_algorithm/population");
var utilis_1 = require("./utilis");
var Network = /** @class */ (function () {
    function Network(mapSettings) {
        var _this = this;
        this.encodeNetworkInputs = function () {
            var snake = { x: _this.currentMovement.snakePos[0].x, y: _this.currentMovement.snakePos[0].y };
            var apple = { x: _this.currentMovement.applePos.x, y: _this.currentMovement.applePos.y };
            var snakePos = _this.currentMovement.snakePos;
            var size = _this.mapSettings;
            var distanceToWalls = new Array();
            var isThereApple = new Array();
            var isPartOfSnake = new Array();
            var headDirection = new Array();
            var tailDirection = new Array();
            distanceToWalls.push(snake.y);
            distanceToWalls.push((snake.y < ((size.width - 1) - snake.x)) ? (snake.y * Math.pow(2, 0.5)) : ((size.width - 1) - snake.x) * Math.pow(2, 0.5));
            distanceToWalls.push((size.width - 1) - snake.x);
            distanceToWalls.push((((size.width - 1) - snake.x) < ((size.height - 1) - snake.y)) ? (((size.width - 1) - snake.x) * Math.pow(2, 0.5)) : (((size.height - 1) - snake.y) * Math.pow(2, 0.5)));
            distanceToWalls.push((size.height - 1) - snake.y);
            distanceToWalls.push((snake.x < ((size.height - 1) - snake.y)) ? (snake.x * Math.pow(2, 0.5)) : ((size.height - 1) - snake.y) * Math.pow(2, 0.5));
            distanceToWalls.push(snake.x);
            distanceToWalls.push(snake.x < snake.y ? (snake.x * Math.pow(snake.x, 0.5)) : (snake.y * Math.pow(2, 0.5)));
            isThereApple.push(((apple.x === snake.x) && (apple.y < snake.y)) ? 1 : 0);
            isThereApple.push(utilis_1.checkPosTopRight(snake, apple, size.height - 1));
            isThereApple.push(((apple.x > snake.x) && (apple.y === snake.y)) ? 1 : 0);
            isThereApple.push(utilis_1.checkPosBottomRight(snake, apple, size.height - 1));
            isThereApple.push(((apple.x === snake.x) && (apple.y > snake.y)) ? 1 : 0);
            isThereApple.push(utilis_1.checkPosBottomLeft(snake, apple, size.height - 1));
            isThereApple.push(((apple.x < snake.x) && (apple.y === snake.y)) ? 1 : 0);
            isThereApple.push(utilis_1.checkPosTopLeft(snake, apple, size.height - 1));
            isPartOfSnake.push(snakePos.some(function (e) { return e.x === snake.x && e.y < snake.y; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return utilis_1.checkPosTopRight(snake, e, size.height - 1) === 1 ? true : false; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return e.x > snake.x && e.y === snake.y; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return utilis_1.checkPosBottomRight(snake, e, size.height - 1) === 1 ? true : false; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return e.x === snake.x && e.y > snake.y; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return utilis_1.checkPosBottomLeft(snake, e, size.height - 1) === 1 ? true : false; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return e.x < snake.x && e.y === snake.y; }) ? 1 : 0);
            isPartOfSnake.push(snakePos.some(function (e) { return utilis_1.checkPosTopLeft(snake, e, size.height - 1) === 1 ? true : false; }) ? 1 : 0);
            switch (_this.currentMovement.headDirection) {
                case 'top':
                    headDirection = [1, 0, 0, 0];
                    break;
                case 'right':
                    headDirection = [0, 1, 0, 0];
                    break;
                case 'bottom':
                    headDirection = [0, 0, 1, 0];
                    break;
                case 'left':
                    headDirection = [0, 0, 0, 1];
                    break;
            }
            switch (_this.currentMovement.tailDirection) {
                case 'top':
                    tailDirection = [1, 0, 0, 0];
                    break;
                case 'right':
                    tailDirection = [0, 1, 0, 0];
                    break;
                case 'bottom':
                    tailDirection = [0, 0, 1, 0];
                    break;
                case 'left':
                    tailDirection = [0, 0, 0, 1];
                    break;
            }
            return __spreadArrays(distanceToWalls, isThereApple, isPartOfSnake, headDirection, tailDirection);
        };
        this.calculateNetwork = function (weights) {
        };
        this.updateSnakePosition = function () {
        };
        this.randomApple = function (initial) {
            if (initial === void 0) { initial = false; }
            var randomApple;
            _this.currentMovement.snakePos = new Array();
            // for (; ;) {
            //     randomApple = {
            //         x:
            //             (Math.floor(Math.random() * this.mapSettings.width + 0.99)),
            //         y:
            //             (Math.floor(Math.random() * this.mapSettings.height + 0.99))
            //     };
            //     if (
            //         !this.currentMovement.snakePos.some((e: Position) => e.x === randomApple.x && e.y === randomApple.y)
            //     ) {
            //         break;
            //     }
            //     if (initial && (randomApple.x === 0 && randomApple.y === 0)) {
            //         continue;
            //     }
            // }
            randomApple = { x: 0, y: 2 };
            return randomApple;
        };
        this.initializeSnakePosition = function () {
            _this.movementRegister = {};
            _this.currentMovement = {};
            var applePos = _this.randomApple(true);
            _this.movementRegister = {
                id: 0,
                motion: [{
                        snakePos: { x: 0, y: 0 },
                        applePos: applePos,
                        points: 0
                    }]
            };
            _this.currentMovement = {
                snakePos: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
                applePos: applePos,
                headDirection: 'right',
                tailDirection: 'left'
            };
        };
        this.makeAMove = function (weights) {
            _this.initializeSnakePosition();
            while (!_this.dead) {
                _this.encodeNetworkInputs();
                _this.calculateNetwork(weights);
                _this.updateSnakePosition();
            }
        };
        this.sendMovementData = function () {
        };
        this.clear = function () {
            _this.dead = false;
            _this.movementRegister = {};
            _this.currentMovement = {};
        };
        this.train = function () {
            _this.population.getPopulation().forEach(function (individual) {
                var weights = individual.getChromosome();
                _this.makeAMove(weights);
                _this.sendMovementData();
                _this.clear();
            });
            _this.population.geneticOperators();
        };
        this.test = function () {
            _this.initializeSnakePosition();
            var arr = _this.encodeNetworkInputs();
            console.table(arr);
        };
        this.population = new population_1["default"](4);
        this.dead = false;
        this.movementRegister = {};
        this.currentMovement = {};
        this.mapSettings = mapSettings;
    }
    return Network;
}());
exports["default"] = Network;
