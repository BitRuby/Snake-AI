import Game from "./game/game";

const main = () => {
  const c = document.getElementById("canvas");
  new Game(c).start();
};

main();
