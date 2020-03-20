import Individual from "./individual";
import { ALGORITHM } from "../config.constants";
import { selection } from "./selection";
import { mutation } from "./mutation";
import { crossover } from "./crossover";

export default class Population {
    private population: Array<Individual>;
    constructor(chromosome_length: number) {
        this.population = new Array<Individual>(ALGORITHM.POPULATION_SIZE).fill(new Individual(chromosome_length));
    }
    geneticOperators = () => {
        this.population = selection(this.population);
        for (let i = 0; i < this.population.length; i++) {
            const offspring = crossover(this.population[i].getChromosome(), this.population[(i + 1) % this.population.length].getChromosome());
            this.population[i].setChromosome(offspring[0]);
            this.population[(i + 1) % this.population.length].setChromosome(offspring[1]);
        }
        this.population.map(i => i.setChromosome(mutation(i.getChromosome())));
    }
}