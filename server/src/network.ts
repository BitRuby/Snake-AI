import Population from "./genetic_algorithm/population";
import Individual from "./genetic_algorithm/individual";
import { MovementRegister, CurrentMovement, MapSettings, Position, Binary } from "./types";
import { checkPosTopRight, checkPosBottomRight, checkPosBottomLeft, checkPosTopLeft } from "./utilis";
import { NETWORK } from "./config.constants";
import { multiply } from 'mathjs';

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

    encodeNetworkInputs = (): Array<number> => {
        const snake: Position = { x: this.currentMovement.snakePos[0].x, y: this.currentMovement.snakePos[0].y };
        const apple: Position = { x: this.currentMovement.applePos.x, y: this.currentMovement.applePos.y };
        const snakePos: Array<Position> = this.currentMovement.snakePos;
        const size: MapSettings = this.mapSettings;
        const distanceToWalls: Array<number> = new Array<number>();
        const isThereApple: Array<Binary> = new Array<Binary>();
        const isPartOfSnake: Array<Binary> = new Array<Binary>();
        let headDirection: Array<Binary> = new Array<Binary>();
        let tailDirection: Array<Binary> = new Array<Binary>();
        distanceToWalls.push(snake.y);
        distanceToWalls.push((snake.y < ((size.width - 1) - snake.x)) ? (snake.y * Math.pow(2, 0.5)) : ((size.width - 1) - snake.x) * Math.pow(2, 0.5));
        distanceToWalls.push((size.width - 1) - snake.x);
        distanceToWalls.push((((size.width - 1) - snake.x) < ((size.height - 1) - snake.y)) ? (((size.width - 1) - snake.x) * Math.pow(2, 0.5)) : (((size.height - 1) - snake.y) * Math.pow(2, 0.5)));
        distanceToWalls.push((size.height - 1) - snake.y);
        distanceToWalls.push((snake.x < ((size.height - 1) - snake.y)) ? (snake.x * Math.pow(2, 0.5)) : ((size.height - 1) - snake.y) * Math.pow(2, 0.5));
        distanceToWalls.push(snake.x);
        distanceToWalls.push(snake.x < snake.y ? (snake.x * Math.pow(snake.x, 0.5)) : (snake.y * Math.pow(2, 0.5)));
        isThereApple.push(((apple.x === snake.x) && (apple.y < snake.y)) ? 1 : 0);
        isThereApple.push(checkPosTopRight(snake, apple, size.height - 1));
        isThereApple.push(((apple.x > snake.x) && (apple.y === snake.y)) ? 1 : 0);
        isThereApple.push(checkPosBottomRight(snake, apple, size.height - 1));
        isThereApple.push(((apple.x === snake.x) && (apple.y > snake.y)) ? 1 : 0);
        isThereApple.push(checkPosBottomLeft(snake, apple, size.height - 1));
        isThereApple.push(((apple.x < snake.x) && (apple.y === snake.y)) ? 1 : 0);
        isThereApple.push(checkPosTopLeft(snake, apple, size.height - 1));
        isPartOfSnake.push(snakePos.some(e => e.x === snake.x && e.y < snake.y) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => checkPosTopRight(snake, e, size.height - 1) === 1 ? true : false) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => e.x > snake.x && e.y === snake.y) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => checkPosBottomRight(snake, e, size.height - 1) === 1 ? true : false) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => e.x === snake.x && e.y > snake.y) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => checkPosBottomLeft(snake, e, size.height - 1) === 1 ? true : false) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => e.x < snake.x && e.y === snake.y) ? 1 : 0);
        isPartOfSnake.push(snakePos.some(e => checkPosTopLeft(snake, e, size.height - 1) === 1 ? true : false) ? 1 : 0);
        switch (this.currentMovement.headDirection) {
            case 'top':
                headDirection = [1, 0, 0, 0];
                break;
            case 'right':
                headDirection = [0, 1, 0, 0];
                break;
            case 'bottom':
                headDirection = [0, 0, 1, 0];
                break;
            case 'left':
                headDirection = [0, 0, 0, 1];
                break;
        }
        switch (this.currentMovement.tailDirection) {
            case 'top':
                tailDirection = [1, 0, 0, 0];
                break;
            case 'right':
                tailDirection = [0, 1, 0, 0];
                break;
            case 'bottom':
                tailDirection = [0, 0, 1, 0];
                break;
            case 'left':
                tailDirection = [0, 0, 0, 1];
                break;
        }
        return [...distanceToWalls, ...isThereApple, ...isPartOfSnake, ...headDirection, ...tailDirection];
    }

    calculateNetwork = (weights: Array<number>) => {
        let layers = new Array<Array<any>>();
        layers[0] = this.encodeNetworkInputs();
        const ar: Array<number> = NETWORK.NN_ARCHITECTURE;
        let acc = 0;
        for (let i = 1; i < ar.length; i++) {
            layers[i] = [];
            for (let j = 0; j < ar[i]; j++) {
                layers[i].push(multiply(layers[i - 1], weights.slice(acc, acc + ar[i - 1])));
                acc += ar[i - 1];
            }
        }
    }

    updateSnakePosition = () => {

    }

    randomApple = (initial: boolean = false): Position => {
        let randomApple: Position;
        this.currentMovement.snakePos = new Array<Position>();
        for (; ;) {
            randomApple = {
                x:
                    (Math.floor(Math.random() * this.mapSettings.width + 0.99)),
                y:
                    (Math.floor(Math.random() * this.mapSettings.height + 0.99))
            };
            if (
                !this.currentMovement.snakePos.some((e: Position) => e.x === randomApple.x && e.y === randomApple.y)
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

    test = () => {
        this.calculateNetwork([]);
    }
}
