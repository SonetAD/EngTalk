import { io } from 'socket.io-client';
import { Backend } from '@/config';

const Socket = io(Backend.instaCall, {
  transports: ['websocket', 'polling'],
  secure: true,
  rejectUnauthorized: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

export const NotificationSocket = io(Backend.notificationSocket, {
  transports: ['websocket', 'polling'],
  secure: true,
  rejectUnauthorized: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default Socket;
