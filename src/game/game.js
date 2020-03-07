export default class Game {
  constructor(c) {
    this.game = c.getContext("2d");
  }
  start = () => {
    const { game } = this;
    game.fillRect(100, 100, 100, 100);
  };
}
