type SELECTION_TYPES = 'tournament' | 'roulette';
type CROSSOVER_TYPES = 'uniform_binary' | 'one_point' | 'two_point' | 'half_uniform_binary' | 'combine';
type MUTATION_TYPES = 'uniform_mutation' | 'swap_mutation' | 'flip_mutation';
type ACTIVATION_FUNCTION_TYPES = 'sigmoid' | 'relu' | 'combine';
type ENCODE_METHOD_TYPES = 'detailed' | 'superficial';

interface IAlgorithm {
  GENERATIONS: number,
  POPULATION_SIZE: number,
  SELECTION_TYPE: SELECTION_TYPES,
  TOURNAMENT_SIZE: number,
  CROSSOVER_TYPE: CROSSOVER_TYPES,
  CROSSOVER_PROPABILITY: number,
  MUTATION_TYPE: MUTATION_TYPES,
  MUTATION_PROPABILITY: number,
  MUTATION_UNIFORM_LOWER_BOUNDS: number,
  MUTATION_UNIFORM_UPPER_BOUNDS: number
}

interface INetwork {
  RANDOM_WEIGHTS_LOWER_BOUNDS: number,
  RANDOM_WEIGHTS_UPPER_BOUNDS: number,
  ACTIVATION_FUNCTION: ACTIVATION_FUNCTION_TYPES,
  NN_ARCHITECTURE: Array<number>,
  ENCODE_METHOD: ENCODE_METHOD_TYPES
}

export const ALGORITHM: IAlgorithm = {
  GENERATIONS: 1000,
  POPULATION_SIZE: 500,
  SELECTION_TYPE: "tournament",
  TOURNAMENT_SIZE: 50,
  CROSSOVER_TYPE: "combine",
  CROSSOVER_PROPABILITY: 0.5,
  MUTATION_TYPE: "flip_mutation",
  MUTATION_PROPABILITY: 0.05,
  MUTATION_UNIFORM_LOWER_BOUNDS: 0.2,
  MUTATION_UNIFORM_UPPER_BOUNDS: 0.6
};

export const NETWORK: INetwork = {
  RANDOM_WEIGHTS_LOWER_BOUNDS: -1,
  RANDOM_WEIGHTS_UPPER_BOUNDS: 1,
  ACTIVATION_FUNCTION: "combine",
  NN_ARCHITECTURE: [8, 32, 32, 4],
  ENCODE_METHOD: 'superficial'
};
