import { ALGORITHM } from "../config.constants";
import { shuffle, compare, copy, randomInt } from "../utilis";
import Individual from "./individual";

export const selection = (population: Array<Individual>): Array<Individual> => {
    switch (ALGORITHM.SELECTION_TYPE) {
        case "tournament":
            return torunament_selection(population);
        case "roulette":
            return roulette_selection(population);
        default:
            return torunament_selection(population);
    }
};

const torunament_selection = (population: Array<Individual>): Array<Individual> => {
    var x = ALGORITHM.TOURNAMENT_SIZE;
    var newPopulation = [];
    newPopulation.push(elitism_select(population));
    while (newPopulation.length !== population.length) {
        var pop = shuffle(population).slice(0, x);
        var maximum = copy(pop.sort(compare)[0]);
        newPopulation.push(maximum);
    }
    return newPopulation;
};

const roulette_selection = (population: Array<Individual>): Array<Individual> => {
    let newPopulation = [];
    const sum = population.map(e => { return e.getFitness() }).reduce((a, b) => a + b, 0);
    for (let i = 0; i < population.length; i++) {
        let pick = randomInt(0, sum);
        let current = 0;
        for (let j = 0; j < population.length; j++) {
            current += population[j].getFitness();
            if (current > pick) {
                newPopulation.push(copy(population[j]));
                break;
            }
        }
    }
    return newPopulation;
}

const elitism_select = (population: Array<Individual>): Array<Individual> => {
    return copy(population.sort(compare)[0]);
}
