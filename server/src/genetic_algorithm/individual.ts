import { NETWORK } from "../config.constants";

export default class Individual {
    private chromosome: Array<number>;
    private fitness: number;
    constructor(chromosome_length: number) {
        var low = NETWORK.RANDOM_WEIGHTS_LOWER_BOUNDS;
        var high = NETWORK.RANDOM_WEIGHTS_UPPER_BOUNDS;
        this.chromosome = new Array(chromosome_length).fill(Math.random() * (high - low) + low);
        this.fitness = 0;
    }
    getFitness(): number {
        return this.fitness;
    }
    getChromosome(): Array<number> {
        return this.chromosome;
    }
}