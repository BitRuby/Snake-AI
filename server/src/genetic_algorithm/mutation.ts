import { ALGORITHM, NETWORK } from "../config.constants";


export const mutation = (chromosome: Array<number>): Array<number> => {
    switch (ALGORITHM.MUTATION_TYPE) {
        case "uniform_mutation":
            return uniform_mutation(chromosome);
        case "swap_mutation":
            return swap_mutation(chromosome);
        case "flip_mutation":
            return flip_mutation(chromosome);
        default:
            return uniform_mutation(chromosome);
    }
};

const uniform_mutation = (chromosome: Array<number>): Array<number> => {
    if (Math.random() < ALGORITHM.MUTATION_PROPABILITY) {
        var lower = ALGORITHM.MUTATION_UNIFORM_LOWER_BOUNDS;
        var upper = ALGORITHM.MUTATION_UNIFORM_UPPER_BOUNDS;
        var min = Math.floor(lower * (chromosome.length - 1));
        var max = Math.floor(upper * (chromosome.length - 1)) + 0.99;
        var randomGene = chromosome[Math.floor(Math.random() * max) + min];
        var randomIndex = Math.floor(Math.random() * max) + min;
        chromosome[randomIndex] = randomGene;
    }
    return chromosome;
};

const swap_mutation = (chromosome: Array<number>): Array<number> => {
    for (let i = 0; i < chromosome.length; i++) {
        if (Math.random() < ALGORITHM.MUTATION_PROPABILITY) {
            const j = Math.floor(Math.random() * chromosome.length);
            const temp = chromosome[i];
            chromosome[i] = chromosome[j];
            chromosome[j] = temp;
        }
    }
    return chromosome;
}

const flip_mutation = (chromosome: Array<number>): Array<number> => {
    var low = NETWORK.RANDOM_WEIGHTS_LOWER_BOUNDS;
    var high = NETWORK.RANDOM_WEIGHTS_UPPER_BOUNDS;
    for (let i = 0; i < chromosome.length; i++) {
        if (Math.random() < ALGORITHM.MUTATION_PROPABILITY) {
            chromosome[i] = Math.random() * (high - low) + low;
        }
    }
    return chromosome;
}