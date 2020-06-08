import * as WebSocket from "ws";
import { SERVER, ALGORITHM, SIZE } from "./config.constants";
import Network from "./network/network";
import { MapSettings } from "./types";

type MessageTypes = 1 | 2;

interface Message {
    data: any;
    type: MessageTypes;
}

export class WebService {
    private ws: WebSocket.Server;
    net!: Network;
    isBusy: boolean = false;
    private generations: number = 0;
    constructor() {
        this.ws = new WebSocket.Server({ port: SERVER.PORT });
        console.log("Server estabilished! Wait for client");
        this.ws.on('connection', w => {
            w.on('message', (m: any) => {
                let msg: Message = JSON.parse(m);
                switch (msg.type) {
                    case 1:
                        if (!this.isBusy) {
                            console.log("Client connected!");
                            this.isBusy = true;
                            const ms: MapSettings = { width: SIZE.WIDTH, height: SIZE.HEIGHT };
                            this.net = new Network(ms);
                            w.send(JSON.stringify({ type: 1, data: ms }));
                        }
                        break;
                    case 2:
                        const result = this.net.train_single();
                        w.send(JSON.stringify({ type: 2, data: { snake: result.motion, time: result.time, generations: this.generations } }));
                        this.generations++;
                        if (this.generations === ALGORITHM.GENERATIONS) this.ws.close();
                        break;
                };
            });
            w.on('close', m => {
                this.net = {} as Network;
                this.generations = 0;
                this.isBusy = false;
                console.log('Client disconnected!');
                return;
            });
        })

    }
}