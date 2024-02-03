"use client"
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocketPage = () => {
  useEffect(() => {
    const serverUrl = 'http://storify-be.fly.dev:3000'; 
    const token = sessionStorage.getItem('token'); 
    console.log("토큰이다"+token);
    // const socket = io(serverUrl, {
    //   extraHeaders: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   withCredentials: true,
    // });
    // const socket = io(serverUrl, {
    //   transports:[Websocket]
    //   auth: {
    //     token: `Bearer ${token}`,
    //   },
    //   withCredentials: true,
    // });
  //   const socket = io(serverUrl, {
  //   transports: ["websocket"],
  //   extraHeaders: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   withCredentials:true,
  // });
    // const socket = io(serverUrl, {
    //   withCredentials: true, // CORS 시 크로스 도메인 쿠키를 지원하기 위해 true 설정
    //   transportOptions: {
    //     polling: {
    //       extraHeaders: {
    //         'Authorization': `Bearer${token}` // 필요한 경우 인증 토큰을 설정
    //       }
    //     }
    //   } 
    // });
    const socket = io(serverUrl, {
      transports: ['websocket'] ,
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials:true
    });
    socket.on('connect', () => {
      console.log('Connected to the server');

      // const friendRequestData = {
      //   senderId: 'user1',
      //   receiverId: 'user2',
      // };
      // socket.emit('friendRequest', friendRequestData);
    });

    socket.on('friendRequest', (data) => {
      console.log('Friend request received', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Page</h1>
    </div>
  );
};

export default WebSocketPage;
