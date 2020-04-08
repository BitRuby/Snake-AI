import data from "./config.json";
import Game from "./game";
export class WebService {
  ws;
  game;
  constructor() {
    this.ws = new WebSocket(data.webServiceUrl);
    this.ws.onopen = (event) =>
      this.ws.send(JSON.stringify({ data: {}, type: 1 }));
    this.ws.onmessage = async (m) => {
      let msg = JSON.parse(m.data);
      switch (msg.type) {
        case 1:
          console.log("Starting game!");
          const c = document.getElementById("canvas");
          this.game = new Game(c, msg);
          this.ws.send(JSON.stringify({ data: {}, type: 2 }));
          break;
        case 2:
          console.log("Playing");
          await this.game.start(msg.data);
          this.ws.send(JSON.stringify({ data: {}, type: 2 })); 
          break;
      }
    };
  }
}
