"use strict";
exports.__esModule = true;
var population_1 = require("./genetic_algorithm/population");
var encoding_1 = require("./network/encoding");
var mathjs_1 = require("mathjs");
var utilis_1 = require("./utilis");
exports.testSelection = function () {
    var pop = new population_1["default"](4, 4);
    var p = pop.getPopulation();
    p[0].setFitness(8);
    p[1].setFitness(4);
    p[2].setFitness(6);
    p[3].setFitness(2);
    console.log("Before selection");
    pop.printChromosomes();
    pop.selection();
    console.log("After selection");
    pop.printChromosomes();
};
exports.testCrossover = function () {
    var pop = new population_1["default"](4, 4);
    var p = pop.getPopulation();
    p[0].setChromosome([1, 1, 1, 1]);
    p[1].setChromosome([0, 0, 0, 0]);
    p[2].setChromosome([4, 4, 4, 4]);
    p[3].setChromosome([2, 2, 2, 2]);
    console.log("Before crossover");
    pop.printChromosomes();
    pop.crossover();
    console.log("After crossover");
    pop.printChromosomes();
};
exports.testMutation = function () {
    var pop = new population_1["default"](4, 4);
    var p = pop.getPopulation();
    p[0].setChromosome([1, 2, 3, 4]);
    p[1].setChromosome([5, 6, 7, 8]);
    p[2].setChromosome([9, 10, 11, 12]);
    p[3].setChromosome([13, 14, 15, 16]);
    console.log("Before mutation");
    pop.printChromosomes();
    pop.mutation();
    console.log("After mutation");
    pop.printChromosomes();
};
exports.testGenetic = function () {
    var pop = new population_1["default"](4, 4);
    var p = pop.getPopulation();
    p[0].setChromosome([1, 2, 3, 4]);
    p[1].setChromosome([5, 6, 7, 8]);
    p[2].setChromosome([9, 10, 11, 12]);
    p[3].setChromosome([13, 14, 15, 16]);
    p[0].setFitness(8);
    p[1].setFitness(4);
    p[2].setFitness(6);
    p[3].setFitness(2);
    console.log("Before selection");
    pop.printChromosomes();
    pop.selection();
    console.log("After selection");
    pop.printChromosomes();
    pop.crossover();
    console.log("After crossover");
    pop.printChromosomes();
    pop.mutation();
    console.log("After mutation");
    pop.printChromosomes();
};
exports.testEncoding = function () {
    var movement = {
        headDirection: 'left',
        tailDirection: 'top',
        points: 0,
        snakePos: [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }],
        applePos: { x: 4, y: 4 },
        health: 100
    };
    var mapS = {
        width: 10,
        height: 10
    };
    var encoded = encoding_1.encodeNetworkInputs(movement, mapS);
    console.log(encoded);
};
exports.testEncoding2 = function () {
    var movement = {
        headDirection: 'bottom',
        tailDirection: 'top',
        points: 0,
        snakePos: [{ x: 2, y: 1 }],
        applePos: { x: 8, y: 0 },
        health: 100
    };
    var mapS = {
        width: 10,
        height: 10
    };
    var encoded = encoding_1.encodeNetworkInputs(movement, mapS);
    console.log(encoded);
};
exports.testNetwork = function () {
    var noFunc = function (n) {
        return n;
    };
    var calculateNetwork = function (weights, mockInput, NN) {
        var layers = new Array();
        layers[0] = mockInput;
        var acc = 0;
        for (var i = 1; i < NN.length; i++) {
            layers[i] = [];
            for (var j = 0; j < NN[i]; j++) {
                layers[i].push(noFunc(mathjs_1.multiply(layers[i - 1], weights.slice(acc, acc + NN[i - 1]))));
                acc += NN[i - 1];
            }
        }
        return layers[layers.length - 1];
    };
    var weights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    var mockInput = [0.5, 0.5, 0.5, 0.5];
    var NN = [4, 2, 4];
    console.log(utilis_1.indexOfMax(calculateNetwork(weights, mockInput, NN))); //0
};
