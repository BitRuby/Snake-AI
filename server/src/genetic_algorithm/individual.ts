import { NETWORK } from "../config.constants";

export default class Individual {
    private chromosome: Array<number>;
    private fitness: number;
    constructor(chromosome_length: number) {
        var low = NETWORK.RANDOM_WEIGHTS_LOWER_BOUNDS;
        var high = NETWORK.RANDOM_WEIGHTS_UPPER_BOUNDS;
        this.chromosome = Array.from({ length: chromosome_length }, () => Math.random() * (high - low) + low);
        this.fitness = 0;
    }
    getFitness(): number {
        return this.fitness;
    }
    setFitness(points: number) {
        this.fitness = points;
    }
    getChromosome(): Array<number> {
        return this.chromosome;
    }
    setChromosome(chromosome: Array<number>): void {
        this.chromosome = chromosome;
    }
}