import Individual from "./genetic_algorithm/individual";

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
