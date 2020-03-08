import data from "../game.config.json";
import Food from "./food.js";

class Snake {
  constructor(c) {
    this.px = data.pixelSize;
    this.snake = [{ x: this.px, y: this.px }];
    this.direction = "Right";
    this.points = 0;
    this.die = { statement: false };
    this.length = 1;
    this.rows = c.height / this.px;
    this.columns = c.width / this.px;
    this.ctx = c.getContext("2d");
    this.food = new Food(this);
  }
  isDie = () => {
    return this.die;
  };
  getPoints = () => {
    return this.points;
  };
  getDirection = () => {
    return this.direction;
  };
  turnDirection = () => {
    switch (this.direction) {
      case "Up":
        return "Down";
      case "Down":
        return "Up";
      case "Left":
        return "Right";
      case "Right":
        return "Left";
    }
  };
  changeDirection = d => {
    this.direction = d;
  };
  containsCoordinates = (x, y) => {
    return this.snake.some(e => e.x === x && e.y === y);
  };
  drawSnake = interval => {
    const { px, ctx, snake, update, die } = this;

    update();
    if (die.statement) {
      clearInterval(interval);
      return;
    }
    ctx.fillStyle = data.snakeColor;
    ctx.strokeStyle = data.backgroundColor;
    snake.map(e => {
      ctx.fillRect(e.x, e.y, px, px);
      ctx.strokeRect(e.x, e.y, px, px);
    });
  };
  isCollected = () => {
    if (
      this.food.getPosition().x === this.snake[0].x &&
      this.food.getPosition().y === this.snake[0].y
    ) {
      this.food = new Food(this);
      this.points += 1;
      console.log(this.points);
      return true;
    } else return false;
  };
  update = () => {
    const { direction, die, snake, px, columns, rows, ctx } = this;
    switch (direction) {
      case "Up":
        if (snake[0].y - px > 0)
          ctx.clearRect(
            snake[snake.length - 1].x,
            snake[snake.length - 1].y,
            px,
            px
          );
        if (this.containsCoordinates(snake[0].x, snake[0].y - px))
          die.statement = true;
        snake.unshift({ x: snake[0].x, y: snake[0].y - px });
        this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].y <= 0) die.statement = true;
        break;
      case "Down":
        if (snake[0].y + px < (rows - 1) * px)
          ctx.clearRect(
            snake[snake.length - 1].x,
            snake[snake.length - 1].y,
            px,
            px
          );
        if (this.containsCoordinates(snake[0].x, snake[0].y + px))
          die.statement = true;
        snake.unshift({ x: snake[0].x, y: snake[0].y + px });
        this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].y >= (rows - 1) * px) die.statement = true;
        break;
      case "Left":
        if (snake[0].x - px > 0)
          ctx.clearRect(
            snake[snake.length - 1].x,
            snake[snake.length - 1].y,
            px,
            px
          );
        if (this.containsCoordinates(snake[0].x - px, snake[0].y))
          die.statement = true;
        snake.unshift({ x: snake[0].x - px, y: snake[0].y });
        this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].x <= 0) die.statement = true;
        break;
      case "Right":
        if (snake[0].x + px < (columns - 1) * px)
          ctx.clearRect(
            snake[snake.length - 1].x,
            snake[snake.length - 1].y,
            px,
            px
          );
        if (this.containsCoordinates(snake[0].x + px, snake[0].y))
          die.statement = true;
        snake.unshift({ x: snake[0].x + px, y: snake[0].y });
        this.isCollected() ? "" : snake.splice(-1, 1);
        if (snake[0].x >= (columns - 1) * px) die.statement = true;
        break;
      default:
    }
  };
}

export default Snake;
