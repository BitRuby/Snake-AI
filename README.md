# Snake-AI
Snake type game with artifictial neural network and genetic algorithm to optimize points scored.

<strong>Used libraries</strong>

Typescript
Lodash
Ws
Mathjs
Babel
Webpack

<strong>Installing</strong>

`$ npm install`

<strong>Running</strong>

First run the server.

`$ npm run-script build:server`

Run client. Client running by default on `localhost:9000`

`$ npm run-script client`

<strong>Configuration</strong>

You can configure neural network and genetic algorithm and map size in `config.constants.ts` 

<strong>Genetic algorithm</strong>

Key  | Value
------------- | -------------
GENERATIONS  | Number of generations of algorithm
POPULATION_SIZE  | Number individuals in population 
SELECTION_TYPE  | Selection methods: tournament or roulette
TOURNAMENT_SIZE  | This property is related to tournament selection only 
CROSSOVER_TYPE  | Crossover methods: uniform_binary, one_point, 'two_point', 'half_uniform_binary', 'combine'
CROSSOVER_PROPABILITY  | Propability of crossover
MUTATION_TYPE  | Mutation methods: uniform_muation, swap_mutation, flip_mutation
MUTATION_PROPABILITY  | Propability of crossover
MUTATION_LOWER_BOUNDS  | Related to unifrom_mutation
MUTATION_UPPER_BOUNDS  | Related to uniform_mutation

<strong>Neural network</strong>

Key  | Value
------------- | -------------
GENERATIONS  | Number of generations of algorithm
RANDOM_WEIGHTS_LOWER_BOUNDS  | Lower bounds of random generated weights in initial 
RANDOM_WEIGHTS_UPPER_BOUNDS  | Upper bounds of random generated weights in initial 
ACTIVATION_FUNCTION  | Activation function of neuron methods: sigmoid, relu, combine
NN_ARCHITECTURE  | Array of neurons in each network layer
ENCODE_METHOD  | Method of creating inputs of network based on game state: superficial, detailed

<strong>Map size</strong>

Key  | Value
------------- | -------------
HEIGHT  | Number of pixels vertically
WIDTH  | Number of pixels horizontally

Pixel is multiplied by client side configuration `config.json` with pixelSize property to scale game in HTML Canvas. You can also change game speed with `gameSpeed` property.



