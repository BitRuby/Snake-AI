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
    const newChromosome = [...chromosome];
    if (Math.random() < ALGORITHM.MUTATION_UNIFORM_PROPABILITY) {
        var lower = ALGORITHM.MUTATION_UNIFORM_LOWER_BOUNDS;
        var upper = ALGORITHM.MUTATION_UNIFORM_UPPER_BOUNDS;
        var min = Math.floor(lower * (newChromosome.length - 1));
        var max = Math.floor(upper * (newChromosome.length - 1)) + 0.99;
        var randomGene = newChromosome[Math.floor(Math.random() * max) + min];
        var randomIndex = Math.floor(Math.random() * (newChromosome.length - 0.01));
        newChromosome[randomIndex] = randomGene;
    }
    return [...newChromosome];
};