import data from "./config.json";
import { ExportToCsv } from 'export-to-csv';

class Game {
  constructor(c) {
    this.px = data.pixelSize;
    this.speed = data.gameSpeed;
    c.style.backgroundColor = data.backgroundColor;
    this.speed = data.gameSpeed;
    this.rows = c.height / this.px;
    this.columns = c.width / this.px;
    this.ctx = c.getContext("2d");
    this.c = c;
    this.interval = {};
    this.statsArray = [];
  }
  drawSnake = (currentMovement) => {
    this.ctx.fillStyle = "#ffffff";
    currentMovement.snakePos.forEach((e, i) => {
      if (i === 0) this.ctx.fillStyle = "#27ae60";
      else this.ctx.fillStyle = "#2ecc71";

      this.ctx.fillRect(e.x * this.px, e.y * this.px, this.px, this.px);
    });
  };
  drawApple = (currentMovement) => {
    const { x, y } = currentMovement.applePos;
    this.ctx.fillStyle = "#ff4757";
    this.ctx.fillRect(x * this.px, y * this.px, this.px, this.px);
  };
  drawStats = (currentMovement, generations) => {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "20px Consolas";
    this.ctx.fillText("Generation: " + generations, 10, 20);
    this.ctx.fillText("Score: " + currentMovement.points, 10, 40);
  };

  clearDrawing = () => {
    this.ctx.clearRect(0, 0, this.px * this.columns, this.px * this.rows);
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  start = async (data) => {
    return new Promise(async (e) => {
      for (let i = 0; i < data.snake.length; i++) {
        this.clearDrawing();
        this.drawSnake(data.snake[i]);
        this.drawApple(data.snake[i]);
        this.drawStats(data.snake[i], data.generations);
        await this.sleep(this.speed);
      }
      this.statsArray.push({score: data.snake[data.snake.length-1].points, time: data.time});
      if (data.generations === 49) {
        const options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true, 
          showTitle: true,
          title: `Generation_${data.generations}`,
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(this.statsArray);
      }
      e(true);
    });
  };
}

export default Game;
