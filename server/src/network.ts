import Population from "./genetic_algorithm/population";
import Individual from "./genetic_algorithm/individual";

interface Position {
    x: number;
    y: number;
}
interface Sequence {
    snakePos: Position;
    applePos: Position;
    points: number;
}
interface MovementRegister {
    motion: Array<Sequence>;
    id: number;
}
interface CurrentMovement {
    snakePos: Array<Position>;
    applePos: Position;
}

export default class Network {
    private dead: boolean;
    private population: Population;
    private movementRegister: MovementRegister;
    private currentMovement: CurrentMovement;

    constructor() {
        this.population = new Population(4);
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
    }

    encodeNetworkInputs = () => {

    }

    calculateNetwork = (weights: Array<number>) => {

    }

    makeAMove = (weights: Array<number>): void => {
        while (!this.dead) {
            this.movementRegister.motion.push();
        }
    }

    sendMovementData = () => {

    }

    clear = () => {
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
    }

    train = () => {
        this.population.getPopulation().forEach((individual: Individual) => {
            const weights = individual.getChromosome();
            this.makeAMove(weights);
            this.sendMovementData();
            this.clear();
        });
        this.population.geneticOperators();
    }
}
