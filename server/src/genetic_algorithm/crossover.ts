import { ALGORITHM } from "../config.constants";

export const crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    switch (ALGORITHM.CROSSOVER_TYPE) {
        case "uniform_binary":
            return uniform_binary_crossover(p1, p2);
        default:
            return uniform_binary_crossover(p1, p2);
    }
};

const uniform_binary_crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    const newP1 = [...p1];
    const newP2 = [...p2];
    const length = newP1.length;
    if (newP1.length === newP2.length) {
        for (let i = 0; i < length; i++) {
            if (Math.random() <= ALGORITHM.CROSSOVER_PROPABILITY) {
                [newP1[i], newP2[i]] = [newP2[i], newP1[i]];
            }
        }
    }
    return [newP1, newP2];
}

