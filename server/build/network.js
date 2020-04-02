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
var config_constants_1 = require("./config.constants");
var mathjs_1 = require("mathjs");
var Network = /** @class */ (function () {
    function Network(mapSettings) {
        var _this = this;
        this.NN = config_constants_1.NETWORK.NN_ARCHITECTURE;
        this.calculateChromosomeLength = function (NN) {
            var cc = 0;
            for (var i = 0; i < NN.length - 1; i++) {
                cc += NN[i] * NN[i + 1];
            }
            return cc;
        };
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
            var layers = new Array();
            layers[0] = _this.encodeNetworkInputs();
            var acc = 0;
            for (var i = 1; i < _this.NN.length; i++) {
                layers[i] = [];
                for (var j = 0; j < _this.NN[i]; j++) {
                    layers[i].push(utilis_1.sigmoid(mathjs_1.multiply(layers[i - 1], weights.slice(acc, acc + _this.NN[i - 1]))));
                    acc += _this.NN[i - 1];
                }
            }
            return layers[layers.length - 1];
        };
        this.updateSnakePosition = function (weights) {
            var _a = _this.currentMovement.snakePos[0], x = _a.x, y = _a.y;
            var direction = utilis_1.indexOfMax(_this.calculateNetwork(weights));
            switch (direction) {
                case 0:
                    if (!_this.isCollideWithBody({ x: x, y: y - 1 }) && !_this.isCollideWithWalls({ x: x, y: y - 1 }) && _this.currentMovement.health > 0) {
                        _this.currentMovement.headDirection = 'top';
                        _this.currentMovement.tailDirection = _this.calculateTailDirection(0, -1);
                        _this.currentMovement.snakePos.unshift({ x: x, y: y - 1 });
                        if (_this.isCollideWithApple({ x: x, y: y - 1 })) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.snakePos.splice(-1, 1);
                            _this.currentMovement.health--;
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_1.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 1:
                    if (!_this.isCollideWithBody({ x: x + 1, y: y }) && !_this.isCollideWithWalls({ x: x + 1, y: y }) && _this.currentMovement.health > 0) {
                        _this.currentMovement.headDirection = 'right';
                        _this.currentMovement.tailDirection = _this.calculateTailDirection(1, 0);
                        _this.currentMovement.snakePos.unshift({ x: x + 1, y: y });
                        if (_this.isCollideWithApple({ x: x + 1, y: y })) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_1.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 2:
                    if (!_this.isCollideWithBody({ x: x, y: y + 1 }) && !_this.isCollideWithWalls({ x: x, y: y + 1 }) && _this.currentMovement.health > 0) {
                        _this.currentMovement.headDirection = 'bottom';
                        _this.currentMovement.tailDirection = _this.calculateTailDirection(0, 1);
                        _this.currentMovement.snakePos.unshift({ x: x, y: y + 1 });
                        if (_this.isCollideWithApple({ x: x, y: y + 1 })) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_1.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 3:
                    if (!_this.isCollideWithBody({ x: x - 1, y: y }) && !_this.isCollideWithWalls({ x: x - 1, y: y }) && _this.currentMovement.health > 0) {
                        _this.currentMovement.headDirection = 'left';
                        _this.currentMovement.tailDirection = _this.calculateTailDirection(-1, 0);
                        _this.currentMovement.snakePos.unshift({ x: x - 1, y: y });
                        if (_this.isCollideWithApple({ x: x - 1, y: y })) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_1.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                default:
                    break;
            }
        };
        this.calculateTailDirection = function (newX, newY) {
            var retVal = 'top';
            if (_this.currentMovement.snakePos.length === 1) {
                var _a = _this.currentMovement.snakePos[_this.currentMovement.snakePos.length - 1], x1 = _a.x, y1 = _a.y;
                if (x1 + newX > x1)
                    retVal = 'left';
                else if (x1 + newX < x1)
                    retVal = 'right';
                else if (y1 + newY > y1)
                    retVal = 'bottom';
                else if (y1 + newY < y1)
                    retVal = 'top';
            }
            else if (_this.currentMovement.snakePos.length >= 2) {
                var _b = _this.currentMovement.snakePos[_this.currentMovement.snakePos.length - 2], x2 = _b.x, y2 = _b.y;
                if (x2 + newX > x2)
                    retVal = 'left';
                else if (x2 + newX < x2)
                    retVal = 'right';
                else if (y2 + newY > y2)
                    retVal = 'bottom';
                else if (y2 + newY < y2)
                    retVal = 'top';
            }
            else
                console.log("WTF?: " + _this.currentMovement.snakePos.length);
            return retVal;
        };
        this.isCollideWithBody = function (pos) {
            return _this.currentMovement.snakePos.some(function (e) { return e.x === pos.x && e.y === pos.y; });
        };
        this.isCollideWithWalls = function (pos) {
            return ((pos.x < 0 || pos.y < 0) || (pos.x > _this.mapSettings.width - 1) || (pos.y > _this.mapSettings.height - 1));
        };
        this.isCollideWithApple = function (pos) {
            var _a = _this.currentMovement.applePos, x = _a.x, y = _a.y;
            return (x === pos.x && y === pos.y);
        };
        this.randomApple = function (initial) {
            if (initial === void 0) { initial = false; }
            var randomApple;
            if (initial)
                _this.currentMovement.snakePos = [{ x: 0, y: 0 }];
            for (;;) {
                randomApple = {
                    x: (Math.floor(Math.random() * _this.mapSettings.width + 0.99)),
                    y: (Math.floor(Math.random() * _this.mapSettings.width + 0.99))
                };
                if (!_this.isCollideWithBody(randomApple)) {
                    break;
                }
                if (initial && (randomApple.x === 0 && randomApple.y === 0)) {
                    continue;
                }
            }
            return randomApple;
        };
        this.initializeSnakePosition = function () {
            _this.movementRegister = {};
            _this.currentMovement = {};
            var applePos = _this.randomApple(true);
            _this.movementRegister = {
                id: 0,
                motion: [{
                        snakePos: [{ x: 0, y: 0 }],
                        applePos: applePos,
                        points: 0,
                        headDirection: 'right',
                        tailDirection: 'left',
                        health: 100
                    }]
            };
            _this.currentMovement = {
                snakePos: [{ x: 0, y: 0 }],
                applePos: applePos,
                headDirection: 'right',
                tailDirection: 'left',
                health: 100,
                points: 0
            };
        };
        this.makeAMove = function (weights) {
            _this.initializeSnakePosition();
            while (!_this.dead) {
                _this.updateSnakePosition(weights);
            }
        };
        this.sendMovementRegisterToClient = function () {
        };
        this.clear = function () {
            _this.dead = false;
            _this.movementRegister = {};
            _this.currentMovement = {};
        };
        this.train = function () {
            for (var i = 0; i < config_constants_1.ALGORITHM.GENERATIONS; i++) {
                _this.population.getPopulation().forEach(function (individual) {
                    var weights = individual.getChromosome();
                    _this.makeAMove(weights);
                    individual.setFitness(_this.currentMovement.points);
                    _this.sendMovementRegisterToClient();
                    _this.clear();
                });
                console.log(_this.population.findBestNetwork().getFitness());
                _this.population.geneticOperators();
            }
        };
        this.test = function () {
            throw new Error("Method not implemented");
        };
        this.verify = function () {
            throw new Error("Method not implemented");
        };
        this.population = new population_1["default"](this.calculateChromosomeLength(this.NN));
        this.dead = false;
        this.movementRegister = {};
        this.currentMovement = {};
        this.mapSettings = mapSettings;
    }
    return Network;
}());
exports["default"] = Network;
