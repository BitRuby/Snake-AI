"use strict";
exports.__esModule = true;
exports.ALGORITHM = {
    POPULATION_SIZE: 500,
    SELECTION_TYPE: "tournament",
    TOURNAMENT_SIZE: 3,
    CROSSOVER_TYPE: "uniform_binary",
    CROSSOVER_PROPABILITY: 0.5,
    MUTATION_TYPE: "uniform_mutation",
    MUTATION_UNIFORM_PROPABILITY: 0.05,
    MUTATION_UNIFORM_LOWER_BOUNDS: 0,
    MUTATION_UNIFORM_UPPER_BOUNDS: 1
};
exports.NETWORK = {
    RANDOM_WEIGHTS_LOWER_BOUNDS: -5,
    RANDOM_WEIGHTS_UPPER_BOUNDS: 5
};
