import { Binary, Position, CurrentMovement, MapSettings, Direction } from "../types";

export const checkPosTopRight = (a: Position, b: Position, length: number): Binary => {
    for (let i = 1; ; i++) {
        if ((a.x + i === b.x) && (a.y - i === b.y)) {
            return 1;
        }
        else {
            if (((a.x + i) >= length) || ((a.y - i) <= 0)) {
                return 0;
            }
        }
    }
}

export const checkPosBottomRight = (a: Position, b: Position, length: number): Binary => {
    for (let i = 1; ; i++) {
        if ((a.x + i === b.x) && (a.y + i === b.y)) {
            return 1;
        }
        else {
            if (((a.x + i) >= length) || ((a.y + i) >= length)) {
                return 0;
            }
        }
    }
}

export const checkPosBottomLeft = (a: Position, b: Position, length: number): Binary => {
    for (let i = 1; ; i++) {
        if ((a.x - i === b.x) && (a.y + i === b.y)) {
            return 1;
        }
        else {
            if (((a.x - i) <= 0) || ((a.y + i) >= length)) {
                return 0;
            }
        }
    }
}

export const checkPosTopLeft = (a: Position, b: Position, length: number): Binary => {
    for (let i = 1; ; i++) {
        if ((a.x - i === b.x) && (a.y - i === b.y)) {
            return 1;
        }
        else {
            if (((a.x - i) <= 0) || ((a.y - i) <= 0)) {
                return 0;
            }
        }
    }
}

export const isCollideWithBody = (pos: Position, currentMovement: CurrentMovement): boolean => {
    return currentMovement.snakePos.some((e: Position) => e.x === pos.x && e.y === pos.y);
}

export const isCollideWithWalls = (pos: Position, mapSettings: MapSettings): boolean => {
    return ((pos.x < 0 || pos.y < 0) || (pos.x > mapSettings.width - 1) || (pos.y > mapSettings.height - 1));
}

export const isCollideWithApple = (pos: Position, currentMovement: CurrentMovement): boolean => {
    const { x, y } = currentMovement.applePos;
    return (x === pos.x && y === pos.y);
}

export const calculateTailDirection = (newX: number, newY: number, currentMovement: CurrentMovement): Direction => {
    let retVal: Direction = 'top';
    if (currentMovement.snakePos.length <= 1) {
        const { x: x1, y: y1 } = currentMovement.snakePos[currentMovement.snakePos.length - 1];
        if (x1 + newX > x1) retVal = 'left';
        else if (x1 + newX < x1) retVal = 'right';
        else if (y1 + newY > y1) retVal = 'bottom';
        else if (y1 + newY < y1) retVal = 'top';
    } else if (currentMovement.snakePos.length >= 2) {
        const { x: x2, y: y2 } = currentMovement.snakePos[currentMovement.snakePos.length - 2];
        if (x2 + newX > x2) retVal = 'left';
        else if (x2 + newX < x2) retVal = 'right';
        else if (y2 + newY > y2) retVal = 'bottom';
        else if (y2 + newY < y2) retVal = 'top';
    }
    return retVal;
}