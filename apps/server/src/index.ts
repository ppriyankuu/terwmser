import http from 'http';
import { createServer } from './server';
import { WebSocketServer, WebSocket, RawData } from 'ws';
import { spawn } from 'node-pty';

const port = process.env.PORT || 8080;
const app = createServer();
const server = http.createServer(app);
const socketServer = new WebSocketServer({ server });

socketServer.on('connection', (socket: WebSocket) => {
  const ptyProcess = spawn('bash', [], {
    name: 'xterm-color',
    env: process.env,
  });

  socket.on('message', (message: RawData) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(data);
      if (data.type === 'command') {
        console.log(`Received command: ${data.payload}`);
        ptyProcess.write(`${data.payload}\n`);
      }
    } catch (error) {
      console.error('Invalid JSON received:', error);
      socket.send(
        JSON.stringify({ type: 'error', message: 'Invalid JSON format' })
      );
    }
  });

  socket.on('close', () => {
    console.log('closed webSocket');
    ptyProcess.kill();
  });

  ptyProcess.onData((data) => {
    console.log(`PTY data: ${data}`);
    const message = JSON.stringify({ type: 'data', payload: data });
    socket.send(message);
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(
      `PTY process exited with code ${exitCode} and signal ${signal}`
    );
    socket.send(JSON.stringify({ type: 'exit', exitCode, signal }));
  });
});

server.listen(port, () => console.log(`running on port:${port}`));
