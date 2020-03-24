import Population from "./genetic_algorithm/population";
import Individual from "./genetic_algorithm/individual";

interface MapSettings {
    width: number;
    height: number;
}
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
    headDirection: string;
    tailDirection: string;
}

export default class Network {
    private dead: boolean;
    private population: Population;
    private movementRegister: MovementRegister;
    private currentMovement: CurrentMovement;
    private mapSettings: MapSettings;
    constructor(mapSettings: MapSettings) {
        this.population = new Population(4);
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
        this.mapSettings = mapSettings;
    }

    encodeNetworkInputs = () => {

    }

    calculateNetwork = (weights: Array<number>) => {

    }

    updateSnakePosition = () => {
        
    }

    randomApple = (initial: boolean = false): Position => {
        let randomApple: Position;
        for (; ;) {
            randomApple = {
                x:
                    (Math.floor(Math.random() * this.mapSettings.width + 0.99)),
                y:
                    (Math.floor(Math.random() * this.mapSettings.height + 0.99))
            };
            if (
                !this.currentMovement.snakePos.some(e => e.x === randomApple.x && e.y === randomApple.y)
            ) {
                break;
            }
            if (initial && (randomApple.x === 0 && randomApple.y === 0)) {
                continue;
            }
        }
        return randomApple;
    }

    initializeSnakePosition = () => {
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
        const applePos = this.randomApple(true);
        this.movementRegister = {
            id: 0,
            motion: [{
                snakePos: { x: 0, y: 0 },
                applePos: applePos,
                points: 0
            }]
        }
        this.currentMovement = {
            snakePos: [{ x: 0, y: 0 }],
            applePos: applePos,
            headDirection: 'right',
            tailDirection: 'left'
        }
    }

    makeAMove = (weights: Array<number>): void => {
        this.initializeSnakePosition();
        while (!this.dead) {
            this.encodeNetworkInputs();
            this.calculateNetwork(weights);
            this.updateSnakePosition();
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
