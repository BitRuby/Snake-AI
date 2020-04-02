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
exports.mutation = function (chromosome) {
    switch (config_constants_1.ALGORITHM.MUTATION_TYPE) {
        case "uniform_mutation":
            return uniform_mutation(chromosome);
        default:
            return uniform_mutation(chromosome);
    }
};
var uniform_mutation = function (chromosome) {
    var newChromosome = __spreadArrays(chromosome);
    if (Math.random() < config_constants_1.ALGORITHM.MUTATION_UNIFORM_PROPABILITY) {
        var lower = config_constants_1.ALGORITHM.MUTATION_UNIFORM_LOWER_BOUNDS;
        var upper = config_constants_1.ALGORITHM.MUTATION_UNIFORM_UPPER_BOUNDS;
        var min = Math.floor(lower * (newChromosome.length - 1));
        var max = Math.floor(upper * (newChromosome.length - 1)) + 0.99;
        var randomGene = newChromosome[Math.floor(Math.random() * max) + min];
        var randomIndex = Math.floor(Math.random() * (newChromosome.length - 0.01));
        newChromosome[randomIndex] = randomGene;
    }
    return __spreadArrays(newChromosome);
};
