"use strict";
exports.__esModule = true;
exports.sigmoid = function (t) {
    return 1 / (1 + Math.pow(Math.E, -t));
};
exports.relu = function (t) {
    return Math.log(1 + Math.pow(Math.E, t));
};
var random_seed = [0.321, 0.655, 0.23, 0.976, 0.003, 0.142, 0.769, 0.865];
exports.randomSeed = function (number) {
    return Number(((number * random_seed[number % 7]) % 1).toPrecision(4));
};
exports.normalize = function (T, Tmin, Tmax) {
    return Tmax === Tmin ? 1 : (T - Tmin) / (Tmax - Tmin);
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
