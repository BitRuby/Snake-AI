"use strict";
exports.__esModule = true;
exports.checkPosTopRight = function (a, b, length) {
    for (var i = 1;; i++) {
        if ((a.x + i === b.x) && (a.y - i === b.y)) {
            return 1;
        }
        else {
            if (((a.x + i) >= length) || ((a.y - i) <= 0)) {
                return 0;
            }
        }
    }
};
exports.checkPosBottomRight = function (a, b, length) {
    for (var i = 1;; i++) {
        if ((a.x + i === b.x) && (a.y + i === b.y)) {
            return 1;
        }
        else {
            if (((a.x + i) >= length) || ((a.y + i) >= length)) {
                return 0;
            }
        }
    }
};
exports.checkPosBottomLeft = function (a, b, length) {
    for (var i = 1;; i++) {
        if ((a.x - i === b.x) && (a.y + i === b.y)) {
            return 1;
        }
        else {
            if (((a.x - i) <= 0) || ((a.y + i) >= length)) {
                return 0;
            }
        }
    }
};
exports.checkPosTopLeft = function (a, b, length) {
    for (var i = 1;; i++) {
        if ((a.x - i === b.x) && (a.y - i === b.y)) {
            return 1;
        }
        else {
            if (((a.x - i) <= 0) || ((a.y - i) <= 0)) {
                return 0;
            }
        }
    }
};
exports.isCollideWithBody = function (pos, currentMovement) {
    return currentMovement.snakePos.some(function (e) { return e.x === pos.x && e.y === pos.y; });
};
exports.isCollideWithWalls = function (pos, mapSettings) {
    return ((pos.x < 0 || pos.y < 0) || (pos.x > mapSettings.width - 1) || (pos.y > mapSettings.height - 1));
};
exports.isCollideWithApple = function (pos, currentMovement) {
    var _a = currentMovement.applePos, x = _a.x, y = _a.y;
    return (x === pos.x && y === pos.y);
};
exports.calculateTailDirection = function (newX, newY, currentMovement) {
    var retVal = 'top';
    if (currentMovement.snakePos.length <= 1) {
        var _a = currentMovement.snakePos[currentMovement.snakePos.length - 1], x1 = _a.x, y1 = _a.y;
        if (x1 + newX > x1)
            retVal = 'left';
        else if (x1 + newX < x1)
            retVal = 'right';
        else if (y1 + newY > y1)
            retVal = 'bottom';
        else if (y1 + newY < y1)
            retVal = 'top';
    }
    else if (currentMovement.snakePos.length >= 2) {
        var _b = currentMovement.snakePos[currentMovement.snakePos.length - 2], x2 = _b.x, y2 = _b.y;
        if (x2 + newX > x2)
            retVal = 'left';
        else if (x2 + newX < x2)
            retVal = 'right';
        else if (y2 + newY > y2)
            retVal = 'bottom';
        else if (y2 + newY < y2)
            retVal = 'top';
    }
    return retVal;
};
