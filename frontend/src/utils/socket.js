// frontend/src/utils/socket.js
import { io } from 'socket.io-client';

let socket;

export function connectSocket() {
  if (!socket) {
    const SERVER = process.env.REACT_APP_SOCKET_URL || (process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace('/api','') : 'http://localhost:5000');
    socket = io(SERVER, { transports: ['websocket'] });
  }
  return socket;
}

export function getSocket() { return socket; }
