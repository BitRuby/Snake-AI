"use strict";
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
exports.mutation = function (chromosome) {
    switch (config_constants_1.ALGORITHM.MUTATION_TYPE) {
        case "uniform_mutation":
            return uniform_mutation(chromosome);
        case "swap_mutation":
            return swap_mutation(chromosome);
        case "flip_mutation":
            return flip_mutation(chromosome);
        default:
            return uniform_mutation(chromosome);
    }
};
var uniform_mutation = function (chromosome) {
    if (Math.random() < config_constants_1.ALGORITHM.MUTATION_PROPABILITY) {
        var lower = config_constants_1.ALGORITHM.MUTATION_UNIFORM_LOWER_BOUNDS;
        var upper = config_constants_1.ALGORITHM.MUTATION_UNIFORM_UPPER_BOUNDS;
        var min = Math.floor(lower * (chromosome.length - 1));
        var max = Math.floor(upper * (chromosome.length - 1)) + 0.99;
        var randomGene = chromosome[Math.floor(Math.random() * max) + min];
        var randomIndex = Math.floor(Math.random() * max) + min;
        chromosome[randomIndex] = randomGene;
    }
    return chromosome;
};
var swap_mutation = function (chromosome) {
    for (var i = 0; i < chromosome.length; i++) {
        if (Math.random() < config_constants_1.ALGORITHM.MUTATION_PROPABILITY) {
            var j = Math.floor(Math.random() * chromosome.length);
            var temp = chromosome[i];
            chromosome[i] = chromosome[j];
            chromosome[j] = temp;
        }
    }
    return chromosome;
};
var flip_mutation = function (chromosome) {
    var low = config_constants_1.NETWORK.RANDOM_WEIGHTS_LOWER_BOUNDS;
    var high = config_constants_1.NETWORK.RANDOM_WEIGHTS_UPPER_BOUNDS;
    for (var i = 0; i < chromosome.length; i++) {
        if (Math.random() < config_constants_1.ALGORITHM.MUTATION_PROPABILITY) {
            chromosome[i] = Math.random() * (high - low) + low;
        }
    }
    return chromosome;
};
