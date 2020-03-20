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
    const length = p1.length;
    if (p1.length === p2.length) {
        for (let i = 0; i < length; i++) {
            if (Math.random() <= ALGORITHM.CROSSOVER_PROPABILITY) {
                [p1[i], p2[i]] = [p2[i], p1[i]];
            }
        }
    }
    return [[...p1], [...p2]];
}