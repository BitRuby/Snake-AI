import Individual from "./individual";
import { ALGORITHM } from "../config.constants";
import { selection } from "./selection";

export default class Population {
    private population: Array<Individual>;
    constructor(chromosome_length: number) {
        this.population = new Array<Individual>(ALGORITHM.POPULATION_SIZE).fill(new Individual(chromosome_length));
    }
    geneticOperators = () => {
        this.population = selection(this.population);
    }
}