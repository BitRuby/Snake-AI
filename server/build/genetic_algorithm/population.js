"use strict";
exports.__esModule = true;
var individual_1 = require("./individual");
var config_constants_1 = require("../config.constants");
var selection_1 = require("./selection");
var mutation_1 = require("./mutation");
var crossover_1 = require("./crossover");
var Population = /** @class */ (function () {
    function Population(chromosome_length) {
        var _this = this;
        this.geneticOperators = function () {
            _this.population = selection_1.selection(_this.population);
            for (var i = 0; i < _this.population.length; i++) {
                var offspring = crossover_1.crossover(_this.population[i].getChromosome(), _this.population[(i + 1) % _this.population.length].getChromosome());
                _this.population[i].setChromosome(offspring[0]);
                _this.population[(i + 1) % _this.population.length].setChromosome(offspring[1]);
            }
            _this.population.map(function (i) { return i.setChromosome(mutation_1.mutation(i.getChromosome())); });
        };
        this.population = new Array(config_constants_1.ALGORITHM.POPULATION_SIZE).fill(new individual_1["default"](chromosome_length));
    }
    return Population;
}());
exports["default"] = Population;