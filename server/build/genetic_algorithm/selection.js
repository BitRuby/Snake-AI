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
    while (newPopulation.length !== population.length) {
        var pop = utilis_1.shuffle(population).slice(0, x);
        var maximum = utilis_1.copy(pop.sort(utilis_1.compare)[0]);
        newPopulation.push(maximum);
    }
    return newPopulation;
};
var roulette_selection = function (population) {
    return [];
};
