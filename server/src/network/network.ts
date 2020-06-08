import Population from "../genetic_algorithm/population";
import Individual from "../genetic_algorithm/individual";
import { MovementRegister, CurrentMovement, MapSettings, Position } from "../types";
import { isCollideWithBody, isCollideWithWalls, isCollideWithApple, calculateTailDirection } from "./utilis";
import { sigmoid, indexOfMax, copy, randomSeed, relu } from "../utilis";
import { NETWORK, ALGORITHM } from "../config.constants";
import { multiply } from 'mathjs';
import { encoding } from "./encoding";
import { activation } from "./activation";
import { performance } from 'perf_hooks';

export default class Network {
    private dead: boolean;
    private population: Population;
    private movementRegister: MovementRegister;
    private currentMovement: CurrentMovement;
    private mapSettings: MapSettings;
    private NN: Array<number> = NETWORK.NN_ARCHITECTURE;
    private randomSeedNumber: number = 0;
    private dataPacket: Array<MovementRegister> = [];
    private generation: number = 0;
    private time: number = 0;
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
        layers[0] = encoding(this.currentMovement, this.mapSettings);
        let acc = 0;
        for (let i = 1; i < this.NN.length; i++) {
            layers[i] = [];
            for (let j = 0; j < this.NN[i]; j++) {
                if (i === this.NN.length - 1) layers[i].push(activation(multiply(layers[i - 1], weights.slice(acc, acc + this.NN[i - 1])), true));
                else layers[i].push(activation(multiply(layers[i - 1], weights.slice(acc, acc + this.NN[i - 1])), false));
                acc += this.NN[i - 1];
            }
        }
        return layers[layers.length - 1];
    }

    private updateSnakePosition = (weights: Array<number>) => {
        const { x, y } = this.currentMovement.snakePos[0];
        let direction: number = indexOfMax(this.calculateNetwork(weights));
        switch (direction) {
            case 0:
                if (this.currentMovement.headDirection === 'bottom') {
                    direction = 1;
                }
                break;
            case 1:
                if (this.currentMovement.headDirection === 'top') {
                    direction = 0;
                }
                break;
            case 2:
                if (this.currentMovement.headDirection === 'right') {
                    direction = 3;
                }
                break;
            case 3:
                if (this.currentMovement.headDirection === 'left') {
                    direction = 2;
                }
                break;
        }
        switch (direction) {
            case 0:
                if (!isCollideWithBody({ x, y: y - 1 }, this.currentMovement) && !isCollideWithWalls({ x, y: y - 1 }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x, y: y - 1 });
                    this.currentMovement.headDirection = 'top';
                    this.currentMovement.tailDirection = calculateTailDirection(this.currentMovement);
                    if (isCollideWithApple({ x, y: y - 1 }, this.currentMovement)) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = (this.mapSettings.height * this.mapSettings.width);
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
                if (!isCollideWithBody({ x, y: y + 1 }, this.currentMovement) && !isCollideWithWalls({ x, y: y + 1 }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x, y: y + 1 });
                    this.currentMovement.headDirection = 'bottom';
                    this.currentMovement.tailDirection = calculateTailDirection(this.currentMovement);
                    if (isCollideWithApple({ x, y: y + 1 }, this.currentMovement)) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = (this.mapSettings.height * this.mapSettings.width);
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
                if (!isCollideWithBody({ x: x - 1, y }, this.currentMovement) && !isCollideWithWalls({ x: x - 1, y }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x: x - 1, y });
                    this.currentMovement.headDirection = 'left';
                    this.currentMovement.tailDirection = calculateTailDirection(this.currentMovement);
                    if (isCollideWithApple({ x: x - 1, y }, this.currentMovement)) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = (this.mapSettings.height * this.mapSettings.width);
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
                if (!isCollideWithBody({ x: x + 1, y }, this.currentMovement) && !isCollideWithWalls({ x: x + 1, y }, this.mapSettings) && this.currentMovement.health > 0) {
                    this.currentMovement.snakePos.unshift({ x: x + 1, y });
                    this.currentMovement.headDirection = 'right';
                    this.currentMovement.tailDirection = calculateTailDirection(this.currentMovement);
                    if (isCollideWithApple({ x: x + 1, y }, this.currentMovement)) {
                        this.currentMovement.points += 1;
                        this.currentMovement.health = (this.mapSettings.height * this.mapSettings.width);
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
                    (Math.floor(randomSeed(this.randomSeedNumber++) * (this.mapSettings.width - 0.01))),
                y:
                    (Math.floor(randomSeed(this.randomSeedNumber++) * (this.mapSettings.height - 0.01))),
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
                health: (this.mapSettings.height * this.mapSettings.width)
            }]
        }
        this.currentMovement = {
            snakePos: [{ x: 0, y: 0 }],
            applePos: applePos,
            headDirection: 'right',
            tailDirection: 'left',
            health: (this.mapSettings.height * this.mapSettings.width),
            points: 0
        }
    }

    private makeAMove = (weights: Array<number>): void => {
        this.initializeSnakePosition();
        while (!this.dead) {
            this.updateSnakePosition(weights);
        }
    }

    private saveMovementRegister = (movementRegister: MovementRegister) => {
        this.dataPacket.push(movementRegister);
    }

    private findBestAndSendToClient = () => {
        let best: MovementRegister = this.dataPacket[0];
        this.dataPacket.forEach(e => {
            if (best.motion[best.motion.length - 1].points < e.motion[e.motion.length - 1].points) {
                best = e;
            }
        });
        return { motion: best.motion, time: this.time };
    }

    private clear = () => {
        this.dead = false;
        this.movementRegister = {} as MovementRegister;
        this.currentMovement = {} as CurrentMovement;
        this.randomSeedNumber = 0;
    }

    private calculateFitness = (): number => {
        return ((this.mapSettings.height * this.mapSettings.width) - this.currentMovement.health) + ((Math.pow(2, this.currentMovement.points) + Math.pow(this.currentMovement.points, 2.1) * 500) - (Math.pow(this.currentMovement.points, 1.2) * (Math.pow(0.25 * ((this.mapSettings.height * this.mapSettings.width) - this.currentMovement.health), 1.3))));
    }

    train = () => {
        for (let i = 0; i < ALGORITHM.GENERATIONS; i++) {
            this.population.getPopulation().forEach((individual: Individual) => {
                const weights = individual.getChromosome();
                this.makeAMove(weights);
                individual.setFitness(this.calculateFitness());
                individual.setPoints(this.currentMovement.points);
                this.saveMovementRegister(this.movementRegister);
                this.clear();
            });
            this.generation++;
            this.findBestAndSendToClient();
            this.dataPacket = [];
            console.log(this.population.findBestNetwork().getFitness());
            console.log(this.population.findBestNetwork().getPoints());
            this.population.geneticOperators();
        }
    }

    train_single = () => {
        this.dataPacket = [];
        var t0 = performance.now()
        this.population.getPopulation().forEach((individual: Individual) => {
            const weights = individual.getChromosome();
            this.makeAMove(weights);
            individual.setFitness(this.calculateFitness());
            individual.setPoints(this.currentMovement.points);
            this.saveMovementRegister(this.movementRegister);
            this.clear();
        });
        this.generation++;
        this.population.geneticOperators();
        var t1 = performance.now()
        this.time = t1 - t0;
        return this.findBestAndSendToClient();
    }

    test = () => {
        throw new Error("Method not implemented");
    }

    verify = () => {
        throw new Error("Method not implemented");
    }
}
