import { ALGORITHM } from "../config.constants";
import { shuffle, compare, copy } from "../utilis";
import Individual from "./individual";

export const selection = (population: Array<Individual>): Array<Individual> => {
    switch (ALGORITHM.SELECTION_TYPE) {
        case "tournament":
            return torunament_selection(population);
        default:
            return torunament_selection(population);
    }
};

const torunament_selection = (population: Array<Individual>): Array<Individual> => {
    var x = ALGORITHM.TOURNAMENT_SIZE;
    var newPopulation = [];
    while (newPopulation.length !== population.length) {
        var pop = shuffle(population).slice(0, x);
        var maximum = copy(pop.sort(compare)[0]);
        newPopulation.push(maximum);
    }
    return newPopulation;
};