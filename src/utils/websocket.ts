import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;


export const initializeWebSocket = (token: string): Socket => {


  socket = io('https://api.storifyai.site/ws-noti', {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  });

  socket.on('connect', () => {
    console.log('소켓 연결됨');

    socket?.emit('auth', `${token}`); 
    console.log("소켓 connected"+socket?.connected);
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

  return socket;
};

export const disconnectWebSocket = (): void => {
    console.log("여기까지는 들어왔음")
  if (socket?.connected) {
    console.log('웹소켓 연결 해제');
    socket.disconnect();
    socket = null;
    console.log("웹소켓 해제함")
  }
  else{
    console.log("웹소켓이 존재하지 않음")
  }
};