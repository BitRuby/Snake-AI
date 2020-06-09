import { CurrentMovement, MapSettings, Position, Binary } from "../types";
import { checkPosTopRight, checkPosBottomRight, checkPosBottomLeft, checkPosTopLeft } from "./utilis";
import { NETWORK } from "../config.constants";
import { normalize } from "../utilis";

export const encoding = (currentMovement: CurrentMovement, mapSettings: MapSettings): Array<number> => {
    switch (NETWORK.ENCODE_METHOD) {
        case 'detailed':
            return encodeNetworkInputs(currentMovement, mapSettings);
        case 'superficial':
            return encodeNetworkInputs2(currentMovement, mapSettings);
        case 'combine':
            return encodeNetworkInputs3(currentMovement, mapSettings);
        default:
            return encodeNetworkInputs2(currentMovement, mapSettings);
    }
}

const encodeNetworkInputs = (currentMovement: CurrentMovement, mapSettings: MapSettings): Array<number> => {
    const snake: Position = { x: currentMovement.snakePos[0].x, y: currentMovement.snakePos[0].y };
    const apple: Position = { x: currentMovement.applePos.x, y: currentMovement.applePos.y };
    const snakePos: Array<Position> = currentMovement.snakePos;
    const size: MapSettings = mapSettings;
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
    switch (currentMovement.headDirection) {
        case 'top':
            headDirection = [1, 0, 0, 0];
            break;
        case 'bottom':
            headDirection = [0, 1, 0, 0];
            break;
        case 'left':
            headDirection = [0, 0, 1, 0];
            break;
        case 'right':
            headDirection = [0, 0, 0, 1];
            break;
    }
    switch (currentMovement.tailDirection) {
        case 'top':
            tailDirection = [1, 0, 0, 0];
            break;
        case 'bottom':
            tailDirection = [0, 1, 0, 0];
            break;
        case 'left':
            tailDirection = [0, 0, 1, 0];
            break;
        case 'right':
            tailDirection = [0, 0, 0, 1];
            break;
    }
    return [...distanceToWalls, ...isThereApple, ...isPartOfSnake, ...headDirection, ...tailDirection];
}

const encodeNetworkInputs2 = (currentMovement: CurrentMovement, mapSettings: MapSettings): Array<number> => {
    const snake: Position = { x: currentMovement.snakePos[0].x, y: currentMovement.snakePos[0].y };
    const apple: Position = { x: currentMovement.applePos.x, y: currentMovement.applePos.y };
    const size: MapSettings = mapSettings;
    const config = [];
    config.push(snake.x === 0 ? 1 : -1);
    config.push(snake.y === 0 ? 1 : -1);
    config.push(size.width - snake.x === 1 ? 1 : -1);
    config.push(size.height - snake.y === 1 ? 1 : -1);
    config.push(snake.x < apple.x ? 1 : -1);
    config.push(snake.y < apple.y ? 1 : -1);
    config.push(snake.x > apple.x ? 1 : -1);
    config.push(snake.y > apple.y ? 1 : -1);
    return config;
}

const encodeNetworkInputs3 = (currentMovement: CurrentMovement, mapSettings: MapSettings): Array<number> => {
    const snake: Position = { x: currentMovement.snakePos[0].x, y: currentMovement.snakePos[0].y };
    const apple: Position = { x: currentMovement.applePos.x, y: currentMovement.applePos.y };
    const size: MapSettings = mapSettings;
    const config = [];
    const leftTail = currentMovement.snakePos.filter(e => e.y === snake.y && e.x < snake.x);
    if (leftTail.length > 0) {
        config.push(snake.x === leftTail[0].x + 1 ? 1 : -1);
    } else {
        config.push(snake.x === 0 ? 1 : -1);
    }
    const topTail = currentMovement.snakePos.filter(e => e.x === snake.x && e.y < snake.y);
    if (topTail.length > 0) {
        config.push(snake.y === topTail[0].y + 1 ? 1 : -1);
    } else {
        config.push(snake.y === 0 ? 1 : -1);
    }
    const rightTail = currentMovement.snakePos.filter(e => e.y === snake.y && e.x > snake.x);
    if (rightTail.length > 0) {
        config.push(snake.x === rightTail[0].x - 1 ? 1 : -1);
    } else {
        config.push(size.width - snake.x === 1 ? 1 : -1);
    }
    const bottomTail = currentMovement.snakePos.filter(e => e.x === snake.x && e.y > snake.y);
    if (bottomTail.length > 0) {
        config.push(snake.y === bottomTail[0].y - 1 ? 1 : -1);
    } else {
        config.push(size.height - snake.y === 1 ? 1 : -1);
    }
    config.push(snake.x < apple.x ? 1 : -1);
    config.push(snake.y < apple.y ? 1 : -1);
    config.push(snake.x > apple.x ? 1 : -1);
    config.push(snake.y > apple.y ? 1 : -1);
    return config;
}