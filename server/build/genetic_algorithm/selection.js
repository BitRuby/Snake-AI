"use strict";
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
var utilis_1 = require("../utilis");
exports.selection = function (population) {
    switch (config_constants_1.ALGORITHM.SELECTION_TYPE) {
        case "tournament":
            return torunament_selection(population);
        case "roulette":
            return roulette_selection(population);
        default:
            return torunament_selection(population);
    }
};
var torunament_selection = function (population) {
    var x = config_constants_1.ALGORITHM.TOURNAMENT_SIZE;
    var newPopulation = [];
    newPopulation.push(elitism_select(population));
    while (newPopulation.length !== population.length) {
        var pop = utilis_1.shuffle(population).slice(0, x);
        var maximum = utilis_1.copy(pop.sort(utilis_1.compare)[0]);
        newPopulation.push(maximum);
    }
    return newPopulation;
};
var roulette_selection = function (population) {
    var newPopulation = [];
    var sum = population.map(function (e) { return e.getFitness(); }).reduce(function (a, b) { return a + b; }, 0);
    for (var i = 0; i < population.length; i++) {
        var pick = utilis_1.randomInt(0, sum);
        var current = 0;
        for (var j = 0; j < population.length; j++) {
            current += population[j].getFitness();
            if (current > pick) {
                newPopulation.push(utilis_1.copy(population[j]));
                break;
            }
        }
    }
    return newPopulation;
};
var elitism_select = function (population) {
    return utilis_1.copy(population.sort(utilis_1.compare)[0]);
};
