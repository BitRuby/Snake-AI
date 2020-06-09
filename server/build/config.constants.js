"use strict";
exports.__esModule = true;
exports.ALGORITHM = {
    GENERATIONS: 50,
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
    NN_ARCHITECTURE: [8, 16, 16, 4],
    ENCODE_METHOD: 'superficial'
};
exports.SERVER = {
    PORT: 9090
};
exports.SIZE = {
    HEIGHT: 40,
    WIDTH: 40
};
