"use strict";
exports.__esModule = true;
var individual_1 = require("./individual");
var config_constants_1 = require("../config.constants");
var selection_1 = require("./selection");
var mutation_1 = require("./mutation");
var crossover_1 = require("./crossover");
var utilis_1 = require("../utilis");
var Population = /** @class */ (function () {
    function Population(chromosome_length, fixedSize) {
        var _this = this;
        this.printChromosomes = function () {
            _this.population.map(function (i) {
                console.table(i.getChromosome());
            });
        };
        this.printFitness = function () {
            _this.population.map(function (i) {
                console.table(i.getFitness());
            });
        };
        this.findBestNetwork = function () {
            var best = utilis_1.copy(_this.population[0]);
            _this.population.forEach(function (e) {
                if (e.getFitness() > best.getFitness()) {
                    best = utilis_1.copy(e);
                }
            });
            return best;
        };
        this.getPopulation = function () {
            return _this.population;
        };
        this.geneticOperators = function () {
            _this.selection();
            _this.crossover();
            _this.mutation();
        };
        this.selection = function () {
            _this.population = selection_1.selection(_this.population);
        };
        this.crossover = function () {
            for (var i = 0; i < _this.population.length; i += 2) {
                if (Math.random() < config_constants_1.ALGORITHM.CROSSOVER_PROPABILITY) {
                    var offspring = crossover_1.crossover(_this.population[i].getChromosome(), _this.population[(i + 1) % _this.population.length].getChromosome());
                    _this.population[i].setChromosome(offspring[0]);
                    _this.population[(i + 1) % _this.population.length].setChromosome(offspring[1]);
                }
            }
        };
        this.mutation = function () {
            _this.population.map(function (i) { return i.setChromosome(mutation_1.mutation(i.getChromosome())); });
        };
        this.population = Array.from({ length: fixedSize ? fixedSize : config_constants_1.ALGORITHM.POPULATION_SIZE }, function () { return new individual_1["default"](chromosome_length); });
    }
    return Population;
}());
exports["default"] = Population;
