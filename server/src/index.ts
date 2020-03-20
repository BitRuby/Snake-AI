// import WebSocket from "ws";
import Population from "./genetic_algorithm/population";

// const ws = new WebSocket.Server({ port: 8080 });

// console.log(ws);

const pop = new Population(64);
pop.printChromosomes();
pop.geneticOperators();
console.log("////////////////");
pop.printChromosomes();

console.log("haha");