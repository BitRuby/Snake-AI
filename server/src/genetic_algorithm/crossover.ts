import { ALGORITHM } from "../config.constants";
import { copy } from "../utilis";

export const crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    switch (ALGORITHM.CROSSOVER_TYPE) {
        case "uniform_binary":
            return uniform_binary_crossover(p1, p2);
        case "one_point":
            return one_point_crossover(p1, p2);
        case "two_point":
            return two_point_crossover(p1, p2);
        case "half_uniform_binary":
            return half_uniform_binary_crossover(p1, p2);
        case "combine":
            if (Math.random() < 0.5) {
                return one_point_crossover(p1, p2);
            } else {
                return two_point_crossover(p1, p2);
            }
        default:
            return uniform_binary_crossover(p1, p2);
    }
};

const uniform_binary_crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    const newP1 = [];
    const newP2 = [];
    for (let i = 0; i < p1.length; i++) {
        let swap = Math.random() < 0.5;
        newP1.push(swap ? p2[i] : p1[i]);
        newP2.push(swap ? p1[i] : p2[i]);
    }
    return [newP1, newP2];
}

const half_uniform_binary_crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    let newP1 = [];
    let newP2 = [];
    let diffBits: Array<number> = [];
    for (let i = 0; i < p1.length; i++)
        if (p1[i] !== p2[i])
            diffBits.push(i);
    let N = diffBits.length;
    newP1 = p1.slice();
    newP2 = p2.slice();

    for (let i = 0; i < N / 2; i++) {
        let idx = Math.floor(Math.random() * diffBits.length);
        newP1[diffBits[idx]] = p2[diffBits[idx]];
        newP2[diffBits[idx]] = p1[diffBits[idx]];
    }
    return [newP1, newP2];
}

const one_point_crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    const point = Math.floor((Math.random() * p1.length));
    const newP1 = [...p1.slice(0, point), ...p2.slice(point)];
    const newP2 = [...p2.slice(0, point), ...p1.slice(point)];
    return [newP1, newP2];
}

const two_point_crossover = (p1: Array<number>, p2: Array<number>): Array<Array<number>> => {
    const newP1 = [];
    const newP2 = [];
    let r1 = Math.floor((Math.random() * p1.length));
    let r2 = Math.floor((Math.random() * p1.length));
    if (r1 > r2) [r1, r2] = [r2, r1];

    for (let i = 0; i < p1.length; i++) {
        newP1.push(i < r1 ? p1[i] : (i < r2 ? p2[i] : p1[i]));
        newP2.push(i < r1 ? p2[i] : (i < r2 ? p1[i] : p2[i]));
    }
    return [newP1, newP2];
}