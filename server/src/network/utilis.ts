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

export const calculateTailDirection = (currentMovement: CurrentMovement): Direction => {
    let retVal: Direction = 'top';
    if (currentMovement.snakePos.length <= 1) {
        const { x: x1, y: y1 } = currentMovement.snakePos[currentMovement.snakePos.length - 1];
        if (currentMovement.headDirection === 'right') return 'left';
        else if (currentMovement.headDirection === 'left') return 'right';
        else if (currentMovement.headDirection === 'top') return 'bottom';
        else if (currentMovement.headDirection === 'bottom') return 'top';
    }
    else if (currentMovement.snakePos.length > 1) {
        const p2 = currentMovement.snakePos[currentMovement.snakePos.length - 2];
        const p1 = currentMovement.snakePos[currentMovement.snakePos.length - 1];
        const diffX = p2.x - p1.x;
        const diffY = p2.y - p1.y;
        if (diffX < 0)
            retVal = 'left';
        else if (diffX > 0)
            retVal = 'right';
        else if (diffY > 0)
            retVal = 'bottom';
        else if (diffY < 0)
            retVal = 'top'
    }
    return retVal;
}