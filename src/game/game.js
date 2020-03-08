import Snake from "./snake";
import data from "../game.config.json";

class Game {
  constructor(c) {
    this.px = data.pixelSize;
    this.speed = data.gameSpeed;
    c.style.backgroundColor = data.backgroundColor;
    this.rows = c.height / this.px;
    this.columns = c.width / this.px;
    this.ctx = c.getContext("2d");
    this.c = c;
    this.interval = {};
  }
  createMap = () => {
    const { px, ctx, columns, rows } = this;
    ctx.fillStyle = data.borderColor;
    ctx.fillRect(0, 0, px * columns, px);
    ctx.fillRect(0, 0, px, px * rows);
    ctx.fillRect(px * (columns - 1), 0, px, px * rows);
    ctx.fillRect(0, px * (rows - 1), px * columns, px);
  };
  start = () => {
    const { createMap, speed, c } = this;
    createMap();
    const snake = new Snake(c);
    window.addEventListener("keydown", key => {
      const direction = key.key.replace("Arrow", "");
      if (
        (direction === "Right" ||
          direction === "Left" ||
          direction === "Up" ||
          direction === "Down") &&
        direction !== snake.turnDirection()
      )
        snake.changeDirection(direction);
    });
    this.interval = window.setInterval(() => {
      snake.drawSnake(this.interval);
    }, speed);
  };
}

export default Game;
