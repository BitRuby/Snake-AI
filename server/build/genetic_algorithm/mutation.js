"use strict";
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
exports.mutation = function (chromosome) {
    switch (config_constants_1.ALGORITHM.MUTATION_TYPE) {
        case "flip_mutation":
            return flip_mutation(chromosome);
        default:
            return flip_mutation(chromosome);
    }
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
