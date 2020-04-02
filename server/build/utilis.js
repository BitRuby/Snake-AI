"use strict";
exports.__esModule = true;
exports.sigmoid = function (t) {
    return 1 / (1 + Math.pow(Math.E, -t));
};
function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = typeof v === "object" ? copy(v) : v;
    }
    return output;
}
exports.copy = copy;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
exports.shuffle = shuffle;
function compare(a, b) {
    if (a.getFitness() < b.getFitness())
        return 1;
    else if (a.getFitness() > b.getFitness())
        return -1;
    else
        return 0;
}
exports.compare = compare;
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
exports.indexOfMax = indexOfMax;
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
