"use client"
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocketPage = () => {
  useEffect(() => {
    const serverUrl = 'ws://api.storifyai.site/';
    const token = sessionStorage.getItem('token');
    console.log("토큰이다: " + token);

    const socket = io(serverUrl, {
      path: "/ws-noti",
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,

    });

    socket.on('connect', () => {
      console.log('Connected to the server');
    //   socket.emit('friendRequest', { senderId: 'user1', receiverId: 'user2' });
    });

    socket.on('connect_error', (err) => {
      console.log('Connection error', err.message);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Disconnected: ${reason}`);
    });

  
    socket.on('friendRequest', (data) => {
      console.log('Friend request received', data);
    });

  
    return () => {
      socket.disconnect();
      console.log("Socket 연결 해제됨");
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Page</h1>
    </div>
  );
};

export default WebSocketPage;
