"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var utilis_1 = require("./utilis");
var config_constants_1 = require("../config.constants");
exports.activation = function (currentMovement, mapSettings) {
    switch (config_constants_1.NETWORK.ENCODE_METHOD) {
        case 'detailed':
            return exports.encodeNetworkInputs(currentMovement, mapSettings);
        case 'superficial':
            return exports.encodeNetworkInputs2(currentMovement, mapSettings);
        default:
            return exports.encodeNetworkInputs2(currentMovement, mapSettings);
    }
};
exports.encodeNetworkInputs = function (currentMovement, mapSettings) {
    var snake = { x: currentMovement.snakePos[0].x, y: currentMovement.snakePos[0].y };
    var apple = { x: currentMovement.applePos.x, y: currentMovement.applePos.y };
    var snakePos = currentMovement.snakePos;
    var size = mapSettings;
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
    switch (currentMovement.headDirection) {
        case 'top':
            headDirection = [1, 0, 0, 0];
            break;
        case 'bottom':
            headDirection = [0, 1, 0, 0];
            break;
        case 'left':
            headDirection = [0, 0, 1, 0];
            break;
        case 'right':
            headDirection = [0, 0, 0, 1];
            break;
    }
    switch (currentMovement.tailDirection) {
        case 'top':
            tailDirection = [1, 0, 0, 0];
            break;
        case 'bottom':
            tailDirection = [0, 1, 0, 0];
            break;
        case 'left':
            tailDirection = [0, 0, 1, 0];
            break;
        case 'right':
            tailDirection = [0, 0, 0, 1];
            break;
    }
    return __spreadArrays(distanceToWalls, isThereApple, isPartOfSnake, headDirection, tailDirection);
};
exports.encodeNetworkInputs2 = function (currentMovement, mapSettings) {
    var snake = { x: currentMovement.snakePos[0].x, y: currentMovement.snakePos[0].y };
    var apple = { x: currentMovement.applePos.x, y: currentMovement.applePos.y };
    var size = mapSettings;
    var config = [];
    config.push(snake.x === 0 ? 1 : -1);
    config.push(snake.y === 0 ? 1 : -1);
    config.push(size.width - snake.x == 1 ? 1 : -1);
    config.push(size.height - snake.y == 1 ? 1 : -1);
    config.push(snake.x < apple.x ? 1 : -1);
    config.push(snake.y < apple.y ? 1 : -1);
    config.push(snake.x > apple.x ? 1 : -1);
    config.push(snake.y > apple.y ? 1 : -1);
    return config;
};
