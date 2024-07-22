import http from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import dockerode from 'dockerode';
const docker = new dockerode();
import express from 'express';


const server = http.createServer(express());
const wss = new WebSocketServer({ server });

const close = async () => {
    wss.close();
}

const init = async () => {

    const removeAnsiCodes = (str: string) => {
        return str.replace(/\x1b\[[0-9;]*m/g, ''); // Entfernt ANSI-Escape-Codes
    };
    
    wss.on('connection', (ws) => {
        console.log('Client connected');
    
        ws.on('message', async (message) => {
            try {
                const command = message.toString();
                const container = await docker.getContainer('node-1');
    
                // Shell-Befehl ausführen
                const exec = await container.exec({
                    Cmd: ['/bin/bash', '-c', command],
                    AttachStdin: true,
                    AttachStdout: true,
                    AttachStderr: true,
                    Tty: true,
                });
    
                const stream = await exec.start({ Detach: false });
    
                stream.on('data', (data) => {
                    const cleanedData = removeAnsiCodes(data.toString());
                    ws.send(cleanedData);
                });
    
                stream.on('end', () => {
                    ws.send('Command execution finished');
                });
    
            } catch (error) {
                console.error('Error executing command:', error);
                ws.send(`Error executing command: ${error.message}`);
            }
        });
    
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
    
    server.listen(3001, () => {
        console.log('WebSocket server is listening on port 3001');
    });

}

export {init, close}