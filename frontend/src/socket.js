// socket.js - Place this in your src folder
import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (url) => {
  if (!socket) {
    socket = io(url, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    // Setup global listeners
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('⚠️ Socket not initialized. Call initSocket() first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected and cleared');
  }
};

export const isSocketConnected = () => {
  return socket?.connected || false;
};