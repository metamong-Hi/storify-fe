"use client"
import React, { useState, useEffect } from 'react';

const WebSocketTest: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {

    const newSocket = new WebSocket('ws://');

    newSocket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    newSocket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket 연결 종료됨');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(input);
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
      <button onClick={sendMessage}>메시지 보내기</button>

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
