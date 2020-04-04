"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
exports.sigmoid = function (t) {
    return 1 / (1 + Math.pow(Math.E, -t));
};
exports.relu = function (t) {
    return Math.log(1 + Math.pow(Math.E, t));
};
exports.randomSeed = function (seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};
exports.randomInt = function (min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.floor(Math.random() * (max - min) + min);
};
exports.normalize = function (T, Tmin, Tmax) {
    return Tmax === Tmin ? 1 : (T - Tmin) / (Tmax - Tmin);
};
function copy(o) {
    return lodash_1.cloneDeep(o);
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
