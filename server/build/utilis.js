"use strict";
exports.__esModule = true;
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
