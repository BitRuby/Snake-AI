"use strict";
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
var Individual = /** @class */ (function () {
    function Individual(chromosome_length) {
        var low = config_constants_1.NETWORK.RANDOM_WEIGHTS_LOWER_BOUNDS;
        var high = config_constants_1.NETWORK.RANDOM_WEIGHTS_UPPER_BOUNDS;
        this.chromosome = Array.from({ length: chromosome_length }, function () { return Math.random() * (high - low) + low; });
        this.fitness = 0;
    }
    Individual.prototype.getFitness = function () {
        return this.fitness;
    };
    Individual.prototype.setFitness = function (points) {
        this.fitness = points;
    };
    Individual.prototype.getChromosome = function () {
        return this.chromosome;
    };
    Individual.prototype.setChromosome = function (chromosome) {
        this.chromosome = chromosome;
    };
    return Individual;
}());
exports["default"] = Individual;
