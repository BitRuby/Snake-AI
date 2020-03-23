"use strict";
exports.__esModule = true;
// import WebSocket from "ws";
var population_1 = require("./genetic_algorithm/population");
// const ws = new WebSocket.Server({ port: 8080 });
// console.log(ws);
var pop = new population_1["default"](4);
for (var i = 0; i < 10; i++) {
    pop.printChromosomes();
    pop.geneticOperators();
    console.log("////////////////");
    pop.printChromosomes();
    console.log("haha");
}
