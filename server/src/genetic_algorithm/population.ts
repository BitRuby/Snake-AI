import Individual from "./individual";
import { ALGORITHM } from "../config.constants";
import { selection } from "./selection";
import { mutation } from "./mutation";
import { crossover } from "./crossover";
import { copy } from "../utilis";

export default class Population {
    private population: Array<Individual>;
    constructor(chromosome_length: number) {
        this.population = Array.from({ length: ALGORITHM.POPULATION_SIZE }, () => new Individual(chromosome_length));
    }
    printChromosomes = () => {
        this.population.map(i => {
            console.table(i.getChromosome());
        })
    }
    findBestNetwork = (): Individual => {
        let best = copy(this.population[0]);
        this.population.forEach(e => {
            if (e.getFitness() > best.getFitness()) {
                best = copy(e);
            }
        });
        return best;
    }
    getPopulation = (): Array<Individual> => {
        return this.population;
    }
    geneticOperators = () => {
        this.population = selection(copy(this.population));
        for (let i = 0; i < this.population.length; i += 2) {
            const offspring = crossover(this.population[i].getChromosome(), this.population[(i + 1) % this.population.length].getChromosome());
            this.population[i].setChromosome(offspring[0]);
            this.population[(i + 1) % this.population.length].setChromosome(offspring[1]);
        }
        this.population.map(i => i.setChromosome(mutation(i.getChromosome())));
    }
}