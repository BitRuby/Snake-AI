"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
exports.crossover = function (p1, p2) {
    switch (config_constants_1.ALGORITHM.CROSSOVER_TYPE) {
        case "uniform_binary":
            return uniform_binary_crossover(p1, p2);
        case "one_point":
            return one_point_crossover(p1, p2);
        case "two_point":
            return two_point_crossover(p1, p2);
        case "half_uniform_binary":
            return half_uniform_binary_crossover(p1, p2);
        case "combine":
            if (Math.random() < 0.5) {
                return one_point_crossover(p1, p2);
            }
            else {
                return two_point_crossover(p1, p2);
            }
        default:
            return uniform_binary_crossover(p1, p2);
    }
};
var uniform_binary_crossover = function (p1, p2) {
    var newP1 = [];
    var newP2 = [];
    for (var i = 0; i < p1.length; i++) {
        var swap = Math.random() < 0.5;
        newP1.push(swap ? p2[i] : p1[i]);
        newP2.push(swap ? p1[i] : p2[i]);
    }
    return [newP1, newP2];
};
var half_uniform_binary_crossover = function (p1, p2) {
    var newP1 = [];
    var newP2 = [];
    var diffBits = [];
    for (var i = 0; i < p1.length; i++)
        if (p1[i] !== p2[i])
            diffBits.push(i);
    var N = diffBits.length;
    newP1 = p1.slice();
    newP2 = p2.slice();
    for (var i = 0; i < N / 2; i++) {
        var idx = Math.floor(Math.random() * diffBits.length);
        newP1[diffBits[idx]] = p2[diffBits[idx]];
        newP2[diffBits[idx]] = p1[diffBits[idx]];
    }
    return [newP1, newP2];
};
var one_point_crossover = function (p1, p2) {
    var point = Math.floor((Math.random() * p1.length));
    var newP1 = __spreadArrays(p1.slice(0, point), p2.slice(point));
    var newP2 = __spreadArrays(p2.slice(0, point), p1.slice(point));
    return [newP1, newP2];
};
var two_point_crossover = function (p1, p2) {
    var _a;
    var newP1 = [];
    var newP2 = [];
    var r1 = Math.floor((Math.random() * p1.length));
    var r2 = Math.floor((Math.random() * p1.length));
    if (r1 > r2)
        _a = [r2, r1], r1 = _a[0], r2 = _a[1];
    for (var i = 0; i < p1.length; i++) {
        newP1.push(i < r1 ? p1[i] : (i < r2 ? p2[i] : p1[i]));
        newP2.push(i < r1 ? p2[i] : (i < r2 ? p1[i] : p2[i]));
    }
    return [newP1, newP2];
};
