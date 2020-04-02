import Population from "./genetic_algorithm/population";
import Individual from "./genetic_algorithm/individual";
import { MovementRegister, CurrentMovement, MapSettings, Position, Direction } from "./types";
import type { Binary } from "./types";
import { checkPosTopRight, checkPosBottomRight, checkPosBottomLeft, checkPosTopLeft, sigmoid, indexOfMax, copy } from "./utilis";
import { NETWORK, ALGORITHM } from "./config.constants";
import { multiply } from 'mathjs';

export default class Network {
    private dead: boolean;
    private population: Population;
    private movementRegister: MovementRegister;
    private currentMovement: CurrentMovement;
    private mapSettings: MapSettings;
    private NN: Array<number> = NETWORK.NN_ARCHITECTURE;
    private snakeApple: number = 1;
    constructor(mapSettings: MapSettings) {
        this.population = new Population(this.calculateChromosomeLength(this.NN));
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
        this.mapSettings = mapSettings;
    }

    private calculateChromosomeLength = (NN: Array<number>): number => {
        let cc = 0;
        for (let i = 0; i < NN.length - 1; i++) {
            cc += NN[i] * NN[i + 1];
        }
        return cc;
    }

    private encodeNetworkInputs = (): Array<number> => {
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

    private calculateNetwork = (weights: Array<number>): Array<number> => {
        let layers = new Array<Array<number>>();
        layers[0] = this.encodeNetworkInputs();
        let acc = 0;
        for (let i = 1; i < this.NN.length; i++) {
            layers[i] = [];
            for (let j = 0; j < this.NN[i]; j++) {
                layers[i].push(sigmoid(multiply(layers[i - 1], weights.slice(acc, acc + this.NN[i - 1]))));
                acc += this.NN[i - 1];
            }
        }
        return layers[layers.length - 1];
    }

    private updateSnakePosition = (weights: Array<number>) => {
        const { x, y } = this.currentMovement.snakePos[0];
        const direction: number = indexOfMax(this.calculateNetwork(weights));
        switch (direction) {
            case 0:
                if (!this.isCollideWithBody({ x, y: y - 1 }) && !this.isCollideWithWalls({ x, y: y - 1 }) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x, y: y - 1 });
                    this.currentMovement.headDirection = 'top';
                    this.currentMovement.tailDirection = this.calculateTailDirection({ x, y: y - 1 });
                    if (this.isCollideWithApple({ x, y: y - 1 })) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = 100;
                        this.currentMovement.applePos = this.randomApple(false);

                    } else {
                        this.currentMovement.snakePos.splice(-1, 1);
                        this.currentMovement.health--;

                    }
                    this.movementRegister.id += 1;
                    this.movementRegister.motion.push(copy(this.currentMovement));
                } else {
                    this.dead = true;
                }
                break;
            case 1:
                if (!this.isCollideWithBody({ x: x + 1, y }) && !this.isCollideWithWalls({ x: x + 1, y }) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x: x + 1, y });
                    this.currentMovement.headDirection = 'right';
                    this.currentMovement.tailDirection = this.calculateTailDirection({ x: x + 1, y });
                    if (this.isCollideWithApple({ x: x + 1, y })) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = 100;
                        this.currentMovement.applePos = this.randomApple(false);

                    } else {
                        this.currentMovement.health--;
                        this.currentMovement.snakePos.splice(-1, 1);
                    }
                    this.movementRegister.id += 1;
                    this.movementRegister.motion.push(copy(this.currentMovement));
                } else {
                    this.dead = true;
                }
                break;
            case 2:
                if (!this.isCollideWithBody({ x, y: y + 1 }) && !this.isCollideWithWalls({ x, y: y + 1 }) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x, y: y + 1 });
                    this.currentMovement.headDirection = 'bottom';
                    this.currentMovement.tailDirection = this.calculateTailDirection({ x, y: y + 1 });
                    if (this.isCollideWithApple({ x, y: y + 1 })) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = 100;
                        this.currentMovement.applePos = this.randomApple(false);
                    } else {
                        this.currentMovement.health--;
                        this.currentMovement.snakePos.splice(-1, 1);
                    }
                    this.movementRegister.id += 1;
                    this.movementRegister.motion.push(copy(this.currentMovement));
                } else {
                    this.dead = true;
                }
                break;
            case 3:
                if (!this.isCollideWithBody({ x: x - 1, y }) && !this.isCollideWithWalls({ x: x - 1, y }) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x: x - 1, y });
                    this.currentMovement.headDirection = 'left';
                    this.currentMovement.tailDirection = this.calculateTailDirection({ x: x - 1, y });
                    if (this.isCollideWithApple({ x: x - 1, y })) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = 100;
                        this.currentMovement.applePos = this.randomApple(false);
                    } else {
                        this.currentMovement.health--;
                        this.currentMovement.snakePos.splice(-1, 1);
                    }
                    this.movementRegister.id += 1;
                    this.movementRegister.motion.push(copy(this.currentMovement));
                } else {
                    this.dead = true;
                }
                break;
            default:
                break;
        }
    }

    private calculateTailDirection = (pos: Position): Direction => {
        const { x: x1, y: y1 } = this.currentMovement.snakePos[this.currentMovement.snakePos.length - 1];
        const { x: x2, y: y2 } = this.currentMovement.snakePos[this.currentMovement.snakePos.length - 2];
        let retVal: Direction = 'top';
        if (this.currentMovement.snakePos.length === 1) {
            if (pos.x > x1) retVal = 'left';
            else if (pos.x < x1) retVal = 'right';
            else if (pos.y > y1) retVal = 'bottom';
            else if (pos.y < y2) retVal = 'top';
        } else {
            if (pos.x > x2) retVal = 'left';
            else if (pos.x < x2) retVal = 'right';
            else if (pos.y > y2) retVal = 'bottom';
            else if (pos.y < y2) retVal = 'top';
        }
        return retVal;
    }

    private isCollideWithBody = (pos: Position): boolean => {
        return this.currentMovement.snakePos.some((e: Position) => e.x === pos.x && e.y === pos.y);
    }

    private isCollideWithWalls = (pos: Position): boolean => {
        return ((pos.x < 0 || pos.y < 0) || (pos.x > this.mapSettings.width - 1) || (pos.y > this.mapSettings.height - 1));
    }

    private isCollideWithApple = (pos: Position): boolean => {
        const { x, y } = this.currentMovement.applePos;
        return (x === pos.x && y === pos.y);
    }

    private randomApple = (initial: boolean = false): Position => {
        let randomApple: Position;
        if (initial) this.currentMovement.snakePos = [{ x: 0, y: 0 }];
        for (; ;) {
            randomApple = {
                x:
                    (Math.floor(Math.random() * this.mapSettings.width + 0.99)),
                y:
                    (Math.floor(Math.random() * this.mapSettings.width + 0.99)),
            };
            if (
                !this.isCollideWithBody(randomApple)
            ) {
                break;
            }
            if (initial && (randomApple.x === 0 && randomApple.y === 0)) {
                continue;
            }
        }
        return randomApple;
    }

    private initializeSnakePosition = () => {
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
        const applePos = this.randomApple(true);
        this.movementRegister = {
            id: 0,
            motion: [{
                snakePos: [{ x: 0, y: 0 }],
                applePos: applePos,
                points: 0,
                headDirection: 'right',
                tailDirection: 'left',
                health: 100
            }]
        }
        this.currentMovement = {
            snakePos: [{ x: 0, y: 0 }],
            applePos: applePos,
            headDirection: 'right',
            tailDirection: 'left',
            health: 100,
            points: 0
        }
    }

    private makeAMove = (weights: Array<number>): void => {
        this.initializeSnakePosition();
        while (!this.dead) {
            this.updateSnakePosition(weights);
        }
    }

    private sendMovementRegisterToClient = () => {

    }

    private clear = () => {
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
    }

    train = () => {
        for (let i = 0; i < ALGORITHM.GENERATIONS; i++) {
            this.population.getPopulation().forEach((individual: Individual) => {
                const weights = individual.getChromosome();
                this.makeAMove(weights);
                individual.setFitness(this.currentMovement.points);
                this.sendMovementRegisterToClient();
                this.clear();
            });
            console.log(this.population.findBestNetwork().getFitness());
            this.population.geneticOperators();
        }
    }

    test = () => {
        throw new Error("Method not implemented");
    }

    verify = () => {
        throw new Error("Method not implemented");
    }
}
