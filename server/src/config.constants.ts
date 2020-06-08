import { IAlgorithm, INetwork, IServer, ISize } from "./types";


export const ALGORITHM: IAlgorithm = {
  GENERATIONS: 500,
  POPULATION_SIZE: 500,
  SELECTION_TYPE: "roulette",
  TOURNAMENT_SIZE: 50,
  CROSSOVER_TYPE: "combine",
  CROSSOVER_PROPABILITY: 0.5,
  MUTATION_TYPE: "flip_mutation",
  MUTATION_PROPABILITY: 0.05,
};

export const NETWORK: INetwork = {
  RANDOM_WEIGHTS_LOWER_BOUNDS: -1,
  RANDOM_WEIGHTS_UPPER_BOUNDS: 1,
  ACTIVATION_FUNCTION: "combine",
  NN_ARCHITECTURE: [8, 32, 32, 4],
  ENCODE_METHOD: 'combine'
};

export const SERVER: IServer = {
  PORT: 9090
}

export const SIZE: ISize = {
  HEIGHT: 40,
  WIDTH: 40
}