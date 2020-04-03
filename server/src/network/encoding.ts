import { CurrentMovement, MapSettings, Position, Binary } from "../types";
import { checkPosTopRight, checkPosBottomRight, checkPosBottomLeft, checkPosTopLeft } from "./utilis";

export const encodeNetworkInputs = (currentMovement: CurrentMovement, mapSettings: MapSettings): Array<number> => {
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