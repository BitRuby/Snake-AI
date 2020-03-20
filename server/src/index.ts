// import WebSocket from "ws";
import Population from "./genetic_algorithm/population";

// const ws = new WebSocket.Server({ port: 8080 });

// console.log(ws);

const pop = new Population(50);
pop.geneticOperators();

console.log("haha");