import { Terminal } from '@xterm/xterm';

export const term: Terminal = new Terminal();
export const ws: WebSocket = new WebSocket('ws://localhost:8080');
