"use strict";
exports.__esModule = true;
var population_1 = require("../genetic_algorithm/population");
var utilis_1 = require("./utilis");
var utilis_2 = require("../utilis");
var config_constants_1 = require("../config.constants");
var mathjs_1 = require("mathjs");
var encoding_1 = require("./encoding");
var activation_1 = require("./activation");
var Network = /** @class */ (function () {
    function Network(mapSettings) {
        var _this = this;
        this.NN = config_constants_1.NETWORK.NN_ARCHITECTURE;
        this.randomSeedNumber = 0;
        this.dataPacket = [];
        this.generation = 0;
        this.calculateChromosomeLength = function (NN) {
            var cc = 0;
            for (var i = 0; i < NN.length - 1; i++) {
                cc += NN[i] * NN[i + 1];
            }
            return cc;
        };
        this.calculateNetwork = function (weights) {
            var layers = new Array();
            layers[0] = encoding_1.encodeNetworkInputs2(_this.currentMovement, _this.mapSettings);
            var acc = 0;
            for (var i = 1; i < _this.NN.length; i++) {
                layers[i] = [];
                for (var j = 0; j < _this.NN[i]; j++) {
                    if (i === _this.NN.length - 1)
                        layers[i].push(activation_1.activation(mathjs_1.multiply(layers[i - 1], weights.slice(acc, acc + _this.NN[i - 1])), true));
                    else
                        layers[i].push(activation_1.activation(mathjs_1.multiply(layers[i - 1], weights.slice(acc, acc + _this.NN[i - 1])), false));
                    acc += _this.NN[i - 1];
                }
            }
            return layers[layers.length - 1];
        };
        this.updateSnakePosition = function (weights) {
            var _a = _this.currentMovement.snakePos[0], x = _a.x, y = _a.y;
            var direction = utilis_2.indexOfMax(_this.calculateNetwork(weights));
            switch (direction) {
                case 0:
                    if (_this.currentMovement.headDirection === 'bottom') {
                        direction = 1;
                    }
                    break;
                case 1:
                    if (_this.currentMovement.headDirection === 'top') {
                        direction = 0;
                    }
                    break;
                case 2:
                    if (_this.currentMovement.headDirection === 'right') {
                        direction = 3;
                    }
                    break;
                case 3:
                    if (_this.currentMovement.headDirection === 'left') {
                        direction = 2;
                    }
                    break;
            }
            switch (direction) {
                case 0:
                    if (!utilis_1.isCollideWithBody({ x: x, y: y - 1 }, _this.currentMovement) && !utilis_1.isCollideWithWalls({ x: x, y: y - 1 }, _this.mapSettings) && _this.currentMovement.health > 0) {
                        _this.currentMovement.snakePos.unshift({ x: x, y: y - 1 });
                        _this.currentMovement.headDirection = 'top';
                        _this.currentMovement.tailDirection = utilis_1.calculateTailDirection(_this.currentMovement);
                        if (utilis_1.isCollideWithApple({ x: x, y: y - 1 }, _this.currentMovement)) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.snakePos.splice(-1, 1);
                            _this.currentMovement.health--;
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_2.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 1:
                    if (!utilis_1.isCollideWithBody({ x: x, y: y + 1 }, _this.currentMovement) && !utilis_1.isCollideWithWalls({ x: x, y: y + 1 }, _this.mapSettings) && _this.currentMovement.health > 0) {
                        _this.currentMovement.snakePos.unshift({ x: x, y: y + 1 });
                        _this.currentMovement.headDirection = 'bottom';
                        _this.currentMovement.tailDirection = utilis_1.calculateTailDirection(_this.currentMovement);
                        if (utilis_1.isCollideWithApple({ x: x, y: y + 1 }, _this.currentMovement)) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_2.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 2:
                    if (!utilis_1.isCollideWithBody({ x: x - 1, y: y }, _this.currentMovement) && !utilis_1.isCollideWithWalls({ x: x - 1, y: y }, _this.mapSettings) && _this.currentMovement.health > 0) {
                        _this.currentMovement.snakePos.unshift({ x: x - 1, y: y });
                        _this.currentMovement.headDirection = 'left';
                        _this.currentMovement.tailDirection = utilis_1.calculateTailDirection(_this.currentMovement);
                        if (utilis_1.isCollideWithApple({ x: x - 1, y: y }, _this.currentMovement)) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_2.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                case 3:
                    if (!utilis_1.isCollideWithBody({ x: x + 1, y: y }, _this.currentMovement) && !utilis_1.isCollideWithWalls({ x: x + 1, y: y }, _this.mapSettings) && _this.currentMovement.health > 0) {
                        _this.currentMovement.snakePos.unshift({ x: x + 1, y: y });
                        _this.currentMovement.headDirection = 'right';
                        _this.currentMovement.tailDirection = utilis_1.calculateTailDirection(_this.currentMovement);
                        if (utilis_1.isCollideWithApple({ x: x + 1, y: y }, _this.currentMovement)) {
                            _this.currentMovement.points += 1;
                            _this.currentMovement.health = 100;
                            _this.currentMovement.applePos = _this.randomApple(false);
                        }
                        else {
                            _this.currentMovement.health--;
                            _this.currentMovement.snakePos.splice(-1, 1);
                        }
                        _this.movementRegister.id += 1;
                        _this.movementRegister.motion.push(utilis_2.copy(_this.currentMovement));
                    }
                    else {
                        _this.dead = true;
                    }
                    break;
                default:
                    break;
            }
        };
        this.randomApple = function (initial) {
            if (initial === void 0) { initial = false; }
            var randomApple;
            if (initial)
                _this.currentMovement.snakePos = [{ x: 0, y: 0 }];
            for (;;) {
                randomApple = {
                    x: (Math.floor(utilis_2.randomSeed(_this.randomSeedNumber++) * (_this.mapSettings.width - 0.01))),
                    y: (Math.floor(utilis_2.randomSeed(_this.randomSeedNumber++) * (_this.mapSettings.height - 0.01)))
                };
                if (!utilis_1.isCollideWithBody(randomApple, _this.currentMovement)) {
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
        this.saveMovementRegister = function (movementRegister) {
            _this.dataPacket.push(movementRegister);
        };
        this.findBestAndSendToClient = function () {
            var best = _this.dataPacket[0];
            _this.dataPacket.forEach(function (e) {
                if (best.motion[best.motion.length - 1].points < e.motion[e.motion.length - 1].points) {
                    best = e;
                }
            });
            console.table(best.motion);
        };
        this.clear = function () {
            _this.dead = false;
            _this.movementRegister = {};
            _this.currentMovement = {};
            _this.randomSeedNumber = 0;
        };
        this.calculateFitness = function () {
            return (100 - _this.currentMovement.health) + ((Math.pow(2, _this.currentMovement.points) + Math.pow(_this.currentMovement.points, 2.1) * 500) - (Math.pow(_this.currentMovement.points, 1.2) * (Math.pow(0.25 * (100 - _this.currentMovement.health), 1.3))));
        };
        this.train = function () {
            for (var i = 0; i < config_constants_1.ALGORITHM.GENERATIONS; i++) {
                _this.population.getPopulation().forEach(function (individual) {
                    var weights = individual.getChromosome();
                    _this.makeAMove(weights);
                    individual.setFitness(_this.calculateFitness());
                    individual.setPoints(_this.currentMovement.points);
                    _this.saveMovementRegister(_this.movementRegister);
                    _this.clear();
                });
                _this.generation++;
                _this.findBestAndSendToClient();
                _this.dataPacket = [];
                console.log(_this.population.findBestNetwork().getFitness());
                console.log(_this.population.findBestNetwork().getPoints());
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
