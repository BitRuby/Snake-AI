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
        default:
            return uniform_binary_crossover(p1, p2);
    }
};
var uniform_binary_crossover = function (p1, p2) {
    var _a;
    var newP1 = __spreadArrays(p1);
    var newP2 = __spreadArrays(p2);
    var length = newP1.length;
    if (newP1.length === newP2.length) {
        for (var i = 0; i < length; i++) {
            if (Math.random() <= config_constants_1.ALGORITHM.CROSSOVER_PROPABILITY) {
                _a = [newP2[i], newP1[i]], newP1[i] = _a[0], newP2[i] = _a[1];
            }
        }
    }
    return [newP1, newP2];
};
var one_point_crossover = function (p1, p2) {
    var _a;
    var newP1 = __spreadArrays(p1);
    var newP2 = __spreadArrays(p2);
    var point = Math.floor((Math.random() * newP1.length) - 0.01);
    if (newP1.length === newP2.length) {
        for (var i = point; i < p1.length; i++) {
            if (Math.random() <= config_constants_1.ALGORITHM.CROSSOVER_PROPABILITY) {
                _a = [newP2[i], newP1[i]], newP1[i] = _a[0], newP2[i] = _a[1];
            }
        }
    }
    return [newP1, newP2];
};
