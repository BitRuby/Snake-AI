"use strict";
exports.__esModule = true;
exports.ALGORITHM = {
    GENERATIONS: 500,
    POPULATION_SIZE: 500,
    SELECTION_TYPE: "roulette",
    TOURNAMENT_SIZE: 50,
    CROSSOVER_TYPE: "combine",
    CROSSOVER_PROPABILITY: 0.5,
    MUTATION_TYPE: "flip_mutation",
    MUTATION_PROPABILITY: 0.05
};
exports.NETWORK = {
    RANDOM_WEIGHTS_LOWER_BOUNDS: -1,
    RANDOM_WEIGHTS_UPPER_BOUNDS: 1,
    ACTIVATION_FUNCTION: "combine",
    NN_ARCHITECTURE: [8, 32, 32, 4],
    ENCODE_METHOD: 'combine'
};
exports.SERVER = {
    PORT: 9090
};
exports.SIZE = {
    HEIGHT: 40,
    WIDTH: 40
};
