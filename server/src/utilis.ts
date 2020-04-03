import Individual from "./genetic_algorithm/individual";

export const sigmoid = (t: any) => {
  return 1 / (1 + Math.pow(Math.E, -t));
};

export const relu = (t: any) => {
  return Math.log(1 + Math.pow(Math.E, t));
}

const random_seed = [0.321, 0.655, 0.23, 0.976, 0.003, 0.142, 0.769, 0.865];

export const randomSeed = (number: number) => {
  return Number(((number * random_seed[number % 7]) % 1).toPrecision(4));
};

export const normalize = (T: number, Tmin: number, Tmax: number) => {
  return Tmax === Tmin ? 1 : (T - Tmin) / (Tmax - Tmin);
};

export function copy(o: any): any {
  var output: any, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = typeof v === "object" ? copy(v) : v;
  }
  return output;
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
