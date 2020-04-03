import Population from "./genetic_algorithm/population";
import { CurrentMovement, MapSettings } from "./types";
import { encodeNetworkInputs } from "./network/encoding";
import { multiply } from "mathjs";
import { indexOfMax } from "./utilis";



export const testSelection = () => {
    const pop = new Population(4, 4);

    const p = pop.getPopulation();
    p[0].setFitness(8);
    p[1].setFitness(4);
    p[2].setFitness(6);
    p[3].setFitness(2);
    console.log("Before selection");
    pop.printChromosomes();
    pop.selection();
    console.log("After selection");
    pop.printChromosomes();
}

export const testCrossover = () => {
    const pop = new Population(4, 4);

    const p = pop.getPopulation();
    p[0].setChromosome([1, 1, 1, 1]);
    p[1].setChromosome([0, 0, 0, 0]);
    p[2].setChromosome([4, 4, 4, 4]);
    p[3].setChromosome([2, 2, 2, 2]);
    console.log("Before crossover");
    pop.printChromosomes();
    pop.crossover();
    console.log("After crossover");
    pop.printChromosomes();
}

export const testMutation = () => {
    const pop = new Population(4, 4);

    const p = pop.getPopulation();
    p[0].setChromosome([1, 2, 3, 4]);
    p[1].setChromosome([5, 6, 7, 8]);
    p[2].setChromosome([9, 10, 11, 12]);
    p[3].setChromosome([13, 14, 15, 16]);
    console.log("Before mutation");
    pop.printChromosomes();
    pop.mutation();
    console.log("After mutation");
    pop.printChromosomes();
}

export const testGenetic = () => {
    const pop = new Population(4, 4);

    const p = pop.getPopulation();
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
}


export const testEncoding = () => {
    const movement: CurrentMovement = {
        headDirection: 'left',
        tailDirection: 'top',
        points: 0,
        snakePos: [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }],
        applePos: { x: 4, y: 4 },
        health: 100
    }
    const mapS: MapSettings = {
        width: 10,
        height: 10
    }
    const encoded = encodeNetworkInputs(movement, mapS);
    console.log(encoded);
}

export const testEncoding2 = () => {
    const movement: CurrentMovement = {
        headDirection: 'bottom',
        tailDirection: 'top',
        points: 0,
        snakePos: [{ x: 2, y: 1 }],
        applePos: { x: 8, y: 0 },
        health: 100
    }
    const mapS: MapSettings = {
        width: 10,
        height: 10
    }
    const encoded = encodeNetworkInputs(movement, mapS);
    console.log(encoded);
}

export const testNetwork = () => {
    const noFunc = (n: any): number => {
        return n;
    }
    const calculateNetwork = (weights: Array<number>, mockInput: Array<number>, NN: Array<number>): Array<number> => {
        let layers = new Array<Array<number>>();
        layers[0] = mockInput;
        let acc = 0;
        for (let i = 1; i < NN.length; i++) {
            layers[i] = [];
            for (let j = 0; j < NN[i]; j++) {
                layers[i].push(noFunc(multiply(layers[i - 1], weights.slice(acc, acc + NN[i - 1]))));
                acc += NN[i - 1];
            }
        }
        return layers[layers.length - 1];
    }
    const weights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    const mockInput = [0.5, 0.5, 0.5, 0.5];
    const NN = [4, 2, 4];
    console.log(indexOfMax(calculateNetwork(weights, mockInput, NN))); //0
}

