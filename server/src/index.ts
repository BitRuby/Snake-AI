// import WebSocket from "ws";
import Population from "./genetic_algorithm/population";
import Network from "./network";

// const ws = new WebSocket.Server({ port: 8080 });

// console.log(ws);

//Receive width/height 10x10


// const pop = new Population(4);
// for (var i = 0; i < 10; i++) {
//     pop.printChromosomes();
//     pop.geneticOperators();
//     console.log("////////////////");
//     pop.printChromosomes();
//     console.log("haha");
// }

const net = new Network({ width: 10, height: 10 });
net.train();
