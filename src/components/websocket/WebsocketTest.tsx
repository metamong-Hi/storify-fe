"use client"
import { io } from 'socket.io-client';



const token=sessionStorage.getItem('token');
const socket = io('https://api.storifyai.site/ws-noti', {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  },
});

socket.on('connect', () => {
  console.log('소켓 연결됨');
  socket.emit(
    'auth',
    `${token}`
  );
});

socket.on('message', (message: string) => {
  console.log('Message from server:', message);
});

socket.on('error', (error: string) => {
  console.log('Error from server:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from ws-noti');
});
﻿
