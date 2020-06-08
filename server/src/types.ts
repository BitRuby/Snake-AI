export type Direction = "right" | "left" | "top" | "bottom";
export type Binary = 0 | 1;
export interface MapSettings {
    width: number;
    height: number;
}
export interface Position {
    x: number;
    y: number;
}

export interface MovementRegister {
    motion: Array<CurrentMovement>;
    id: number;
}
export interface CurrentMovement {
    snakePos: Array<Position>;
    applePos: Position;
    headDirection: Direction;
    tailDirection: Direction;
    points: number;
    health: number;
}

type SELECTION_TYPES = 'tournament' | 'roulette';
type CROSSOVER_TYPES = 'uniform_binary' | 'one_point' | 'two_point' | 'half_uniform_binary' | 'combine';
type MUTATION_TYPES = 'flip_mutation';
type ACTIVATION_FUNCTION_TYPES = 'sigmoid' | 'relu' | 'combine';
type ENCODE_METHOD_TYPES = 'detailed' | 'superficial' | 'combine';

export interface IAlgorithm {
    GENERATIONS: number,
    POPULATION_SIZE: number,
    SELECTION_TYPE: SELECTION_TYPES,
    TOURNAMENT_SIZE: number,
    CROSSOVER_TYPE: CROSSOVER_TYPES,
    CROSSOVER_PROPABILITY: number,
    MUTATION_TYPE: MUTATION_TYPES,
    MUTATION_PROPABILITY: number,
}

export interface INetwork {
    RANDOM_WEIGHTS_LOWER_BOUNDS: number,
    RANDOM_WEIGHTS_UPPER_BOUNDS: number,
    ACTIVATION_FUNCTION: ACTIVATION_FUNCTION_TYPES,
    NN_ARCHITECTURE: Array<number>,
    ENCODE_METHOD: ENCODE_METHOD_TYPES
}

export interface IServer {
    PORT: number
}

export interface ISize {
    HEIGHT: number;
    WIDTH: number;
}