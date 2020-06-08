import { ALGORITHM, NETWORK } from "../config.constants";


export const mutation = (chromosome: Array<number>): Array<number> => {
    switch (ALGORITHM.MUTATION_TYPE) {
        case "flip_mutation":
            return flip_mutation(chromosome);
        default:
            return flip_mutation(chromosome);
    }
};

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