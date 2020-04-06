import data from "./config.json";
import Game from "./game/game";
export class WebService {
  ws;
  constructor() {
    this.ws = new WebSocket(data.webServiceUrl);
    this.ws.onopen = (event) => this.ws.send(JSON.stringify({data: {}, type: 1}));

    this.ws.onmessage = function (e) {
      let msg = JSON.parse(m);
      switch (msg.type) {
          case 1:
              console.log("Starting game!");
              const c = document.getElementById("canvas");
              new Game(c).start();
              break;
          case 2:
              break;
      };
    };
  }
}
