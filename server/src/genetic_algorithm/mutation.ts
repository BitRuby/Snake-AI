import { ALGORITHM } from "../config.constants";


export const mutation = (chromosome: Array<number>): Array<number> => {
    switch (ALGORITHM.MUTATION_TYPE) {
        case "uniform_mutation":
            return uniform_mutation(chromosome);
        default:
            return uniform_mutation(chromosome);
    }
};

const uniform_mutation = (chromosome: Array<number>): Array<number> => {
    var lower = ALGORITHM.MUTATION_UNIFORM_LOWER_BOUNDS;
    var upper = ALGORITHM.MUTATION_UNIFORM_UPPER_BOUNDS;
    var min = Math.floor(lower * (chromosome.length - 1));
    var max = Math.floor(upper * (chromosome.length - 1));
    var randomGene = chromosome[Math.floor(Math.random() * max) + min];
    var randomIndex = Math.floor(Math.random() * (chromosome.length - 1));
    chromosome[randomIndex] = randomGene;
    return [...chromosome];
};