import WebSocket from "ws";

const ws = new WebSocket.Server({ port: 8080 });

console.log(ws);