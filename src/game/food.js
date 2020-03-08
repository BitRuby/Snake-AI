class Food {
  position = {};
  constructor(snakeRef) {
    this.snakeRef = snakeRef;
    this.snakeRef.ctx.fillStyle = "#ff4757";
    for (;;) {
      this.position = {
        x:
          (Math.floor(Math.random() * (this.snakeRef.columns - 2)) + 1) *
          this.snakeRef.px,
        y:
          (Math.floor(Math.random() * (this.snakeRef.rows - 2)) + 1) *
          this.snakeRef.px
      };
      if (
        !this.snakeRef.containsCoordinates(this.position.x, this.position.y)
      ) {
        break;
      }
    }
    this.snakeRef.ctx.fillRect(
      this.position.x,
      this.position.y,
      snakeRef.px,
      snakeRef.px
    );
  }
  getPosition = () => {
    return this.position;
  };
}

export default Food;
