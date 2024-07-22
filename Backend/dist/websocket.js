"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const dockerode_1 = __importDefault(require("dockerode"));
const docker = new dockerode_1.default();
const express_1 = __importDefault(require("express"));
const server = http_1.default.createServer((0, express_1.default)());
const wss = new ws_1.Server({ server });
const close = async () => {
    wss.close();
};
exports.close = close;
const init = async () => {
    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('message', async (message) => {
            try {
                const command = message.toString();
                const container = await docker.getContainer('node-1');
                const exec = await container.exec({
                    Cmd: [command],
                    AttachStdin: true,
                    AttachStdout: true,
                    AttachStderr: true,
                    Tty: true,
                });
                const stream = await exec.start({ Detach: false });
                stream.on('data', (data) => {
                    ws.send(data.toString());
                });
                stream.on('end', () => {
                    ws.send('');
                });
            }
            catch (error) {
                console.error('Error executing command:', error);
                ws.send(``);
            }
        });
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
    server.listen(3001, () => {
        console.log('WebSocket server is listening on port 3001');
    });
};
exports.init = init;
//# sourceMappingURL=websocket.js.map