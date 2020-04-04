import Individual from "./genetic_algorithm/individual";
import { cloneDeep } from "lodash";
export const sigmoid = (t: any) => {
  return 1 / (1 + Math.pow(Math.E, -t));
};

export const relu = (t: any) => {
  return Math.log(1 + Math.pow(Math.E, t));
}

export const randomSeed = (seed: number) => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const randomInt = (min: number = 0, max: number = 1): number => {
  return Math.floor(Math.random() * (max - min) + min);
};


export const normalize = (T: number, Tmin: number, Tmax: number) => {
  return Tmax === Tmin ? 1 : (T - Tmin) / (Tmax - Tmin);
};

export function copy(o: any): any {
  return cloneDeep(o);
}

export function shuffle<T>(array: Array<T>): Array<T> {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export function compare(a: Individual, b: Individual): number {
  if (a.getFitness() < b.getFitness()) return 1;
  else if (a.getFitness() > b.getFitness()) return -1;
  else return 0;
}

export function indexOfMax(arr: Array<number>): number {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}
