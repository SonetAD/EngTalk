import { io } from 'socket.io-client';
import { Backend } from '@/config';

const Socket = io(Backend.instaCall, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default Socket;