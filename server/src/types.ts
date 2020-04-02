export type Direction = "right" | "left" | "top" | "bottom";
export type Binary = 0 | 1;
export interface MapSettings {
    width: number;
    height: number;
}
export interface Position {
    x: number;
    y: number;
}

export interface MovementRegister {
    motion: Array<CurrentMovement>;
    id: number;
}
export interface CurrentMovement {
    snakePos: Array<Position>;
    applePos: Position;
    headDirection: Direction;
    tailDirection: Direction;
    points: number;
    health: number;
}
