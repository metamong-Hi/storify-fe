
"use client"
import React, { useState, useEffect } from 'react';

const WebSocketTest: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const newSocket = new WebSocket(`ws://storify-be.fly.dev:3000`);
    console.log(newSocket);
    console.log("야 여기다");
    // const token = localStorage.getItem('token');
    const token=sessionStorage.getItem('token');
    console.log("여기가 토큰임"+token);
    newSocket.onopen = () => {
      console.log('WebSocket 연결됨');
      // const token = localStorage.getItem('token');
      const token=sessionStorage.getItem('token');
      console.log("여기가 토큰임"+token);
    newSocket.send(JSON.stringify({ event: 'connection', token }));
    };

    newSocket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket 연결 종료됨');
    };
    newSocket.onerror = (event) => {
      console.error('WebSocket 오류 발생:', event);
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendFriendRequest = () => {
    if (socket) {
      const messageData = {
        senderId: 'yourSenderId',
        receiverId: input
      };
      socket.send(JSON.stringify({ event: 'friendRequest', data: messageData }));
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendFriendRequest}>친구 요청 보내기</button>

      <div>
        <h2>수신된 메시지:</h2>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketTest;
