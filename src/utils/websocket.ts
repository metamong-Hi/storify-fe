import { io, Socket } from "socket.io-client";
import Swal from 'sweetalert2';
let socket: Socket | null = null;

export const getSocket = () => socket;
export const initializeWebSocket = (token: string): Socket => {
  // if (socket && socket.connected) {
  //   console.log('소켓이 이미 연결되어 있습니다.');
  //   return socket;
  // }

  socket = io('https://api.storifyai.site/ws-noti', {
    // socket=io('http://localhost:3001/ws-noti',{
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
    socket?.on('friendRequest', (data) => {
      console.log('Friend request received by user2', data);
    });
    socket?.on('missedNotifications',(data)=>{
      console.log("일단 여기 좋아요 찍힘",data);
    });
    socket?.on('like', (data) => {
      console.log('좋아요 받음', data);
      Swal.fire({
        title: '❤️좋아요를 받았어요❤️',
        text: data.message,
        confirmButtonText: '확인'
      });
    });

    // socket?.emit('like', (data) => {
    //   console.log('Like 알림 받음:', data);
    // });
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