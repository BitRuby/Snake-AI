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
exports.calculateTailDirection = function (currentMovement) {
    var retVal = 'top';
    if (currentMovement.snakePos.length <= 1) {
        var _a = currentMovement.snakePos[currentMovement.snakePos.length - 1], x1 = _a.x, y1 = _a.y;
        if (currentMovement.headDirection === 'right')
            return 'left';
        else if (currentMovement.headDirection === 'left')
            return 'right';
        else if (currentMovement.headDirection === 'top')
            return 'bottom';
        else if (currentMovement.headDirection === 'bottom')
            return 'top';
    }
    else if (currentMovement.snakePos.length > 1) {
        var p2 = currentMovement.snakePos[currentMovement.snakePos.length - 2];
        var p1 = currentMovement.snakePos[currentMovement.snakePos.length - 1];
        var diffX = p2.x - p1.x;
        var diffY = p2.y - p1.y;
        if (diffX < 0)
            retVal = 'left';
        else if (diffX > 0)
            retVal = 'right';
        else if (diffY > 0)
            retVal = 'bottom';
        else if (diffY < 0)
            retVal = 'top';
    }
    return retVal;
};
