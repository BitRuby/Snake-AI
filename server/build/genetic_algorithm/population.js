"use strict";
exports.__esModule = true;
var individual_1 = require("./individual");
var config_constants_1 = require("../config.constants");
var selection_1 = require("./selection");
var Population = /** @class */ (function () {
    function Population(chromosome_length) {
        var _this = this;
        this.printChromosomes = function () {
            _this.population.map(function (i) {
                console.table(i.getChromosome());
            });
        };
        this.geneticOperators = function () {
            _this.population = selection_1.selection(_this.population);
            // for (let i = 0; i < this.population.length; i++) {
            //     const offspring = crossover(this.population[i].getChromosome(), this.population[(i + 1) % this.population.length].getChromosome());
            //     this.population[i].setChromosome(offspring[0]);
            //     this.population[(i + 1) % this.population.length].setChromosome(offspring[1]);
            // }
            // this.population.map(i => i.setChromosome(mutation(i.getChromosome())));
        };
        this.population = Array.from({ length: config_constants_1.ALGORITHM.POPULATION_SIZE }, function () { return new individual_1["default"](chromosome_length); });
    }
    return Population;
}());
exports["default"] = Population;
