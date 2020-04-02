"use strict";
exports.__esModule = true;
var network_1 = require("./network");
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
var net = new network_1["default"]({ width: 10, height: 10 });
net.train();
