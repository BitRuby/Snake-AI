import Population from "../genetic_algorithm/population";
import Individual from "../genetic_algorithm/individual";
import { MovementRegister, CurrentMovement, MapSettings, Position } from "../types";
import { isCollideWithBody, isCollideWithWalls, isCollideWithApple, calculateTailDirection } from "./utilis";
import { sigmoid, indexOfMax, copy } from "../utilis";
import { NETWORK, ALGORITHM } from "../config.constants";
import { multiply } from 'mathjs';
import { encodeNetworkInputs } from "./encoding";

export default class Network {
    private dead: boolean;
    private population: Population;
    private movementRegister: MovementRegister;
    private currentMovement: CurrentMovement;
    private mapSettings: MapSettings;
    private NN: Array<number> = NETWORK.NN_ARCHITECTURE;
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

    private calculateNetwork = (weights: Array<number>): Array<number> => {
        let layers = new Array<Array<number>>();
        layers[0] = encodeNetworkInputs(this.currentMovement, this.mapSettings);
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
                if (!isCollideWithBody({ x, y: y - 1 }, this.currentMovement) && !isCollideWithWalls({ x, y: y - 1 }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.headDirection = 'top';
                    this.currentMovement.tailDirection = calculateTailDirection(0, -1, this.currentMovement);
                    this.currentMovement.snakePos.unshift({ x, y: y - 1 });
                    if (isCollideWithApple({ x, y: y - 1 }, this.currentMovement)) {
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
                if (!isCollideWithBody({ x: x + 1, y }, this.currentMovement) && !isCollideWithWalls({ x: x + 1, y }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.headDirection = 'bottom';
                    this.currentMovement.tailDirection = calculateTailDirection(1, 0, this.currentMovement);
                    this.currentMovement.snakePos.unshift({ x: x + 1, y });
                    if (isCollideWithApple({ x: x + 1, y }, this.currentMovement)) {
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
                if (!isCollideWithBody({ x, y: y + 1 }, this.currentMovement) && !isCollideWithWalls({ x, y: y + 1 }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.headDirection = 'left';
                    this.currentMovement.tailDirection = calculateTailDirection(0, 1, this.currentMovement);
                    this.currentMovement.snakePos.unshift({ x, y: y + 1 });
                    if (isCollideWithApple({ x, y: y + 1 }, this.currentMovement)) {
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
                if (!isCollideWithBody({ x: x - 1, y }, this.currentMovement) && !isCollideWithWalls({ x: x - 1, y }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.headDirection = 'right';
                    this.currentMovement.tailDirection = calculateTailDirection(-1, 0, this.currentMovement);
                    this.currentMovement.snakePos.unshift({ x: x - 1, y });
                    if (isCollideWithApple({ x: x - 1, y }, this.currentMovement)) {
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
                !isCollideWithBody(randomApple, this.currentMovement)
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

    private calculateFitness = (): number => {
        return (100 - this.currentMovement.health) + ((Math.pow(2, this.currentMovement.points) + Math.pow(this.currentMovement.points, 2.1) * 500) - (Math.pow(this.currentMovement.points, 1.2) * (Math.pow(0.25 * (100 - this.currentMovement.health), 1.3))));
    }

    train = () => {
        for (let i = 0; i < ALGORITHM.GENERATIONS; i++) {
            this.population.getPopulation().forEach((individual: Individual) => {
                const weights = individual.getChromosome();
                this.makeAMove(weights);
                individual.setFitness(this.calculateFitness());
                individual.setPoints(this.currentMovement.points);
                this.sendMovementRegisterToClient();
                this.clear();
            });
            console.log(this.population.findBestNetwork().getFitness());
            console.log(this.population.findBestNetwork().getPoints());
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
