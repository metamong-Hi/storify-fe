"use client"
import React,{useState,useEffect} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Textarea,
  Button,
} from '@nextui-org/react';

interface FriendDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendDrawer: React.FC<FriendDrawerProps> = ({ isOpen, onClose }) => {
  const incomingRequests = ['User1', 'User2', 'User3'];
  const sentRequests = ['User4', 'User5'];
  // const currentFriends = ['Friend1', 'Friend2', 'Friend3', 'Friend4'];
  const [currentFriends, setCurrentFriends] = useState<string[]>([]);
  const passImageUrl = '/images/buttons/pass.png';
  const nonPassImageUrl = '/images/buttons/nonPass.png';
  const doorImageUrl = '/images/buttons/door.png';
  
  //여기서부터 수정함 - 1/30
  useEffect(() => {
    const fetchFriends = async () => {
      console.log("여기까지 들어옴 친구")
      const token=localStorage.getItem('token')
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +`/api/friends/${token}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('친구 망함');
        }
        const data = await response.json();
        setCurrentFriends(data); 
        console.log('여기까지 왔음');
        console.log(data);
      } catch (error) {
        console.error('친구 에러', error);
      }
    };

    fetchFriends();
  }, []); 
  
  return (
    <div
      className={`fixed top-[70px] right-0 w-64 h-full bg-white shadow-lg z-50 transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="p-4">
        <Card className="mb-4">
          <h2 className="text-lg font-bold mb-2">나에게 들어온 친구요청</h2>
          <ul>
            {incomingRequests.map((request) => (
              <li key={request} className="py-1 flex justify-between items-center">
                {request}
                <Image src={passImageUrl} width="30px" height="30px" alt="Pass" />
                <Image src={nonPassImageUrl} width="30px" height="30px" alt="nonPass" />
              </li>
            ))}
          </ul>
        </Card>
        <Divider />
        <Card className="mb-4 mt-4">
          <h2 className="text-lg font-bold mb-2">내가 보낸 친구요청</h2>
          <ul>
            {sentRequests.map((request) => (
              <li key={request} className="py-1 flex justify-between items-center">
                {request}
                <Image src={nonPassImageUrl} width="30px" height="30px" alt="nonPass" />
              </li>
            ))}
          </ul>
        </Card>
        <Divider />
        <Card className="mb-4 mt-4">
          <h2 className="text-lg font-bold mb-2">현재 친구 목록</h2>
          <ul>
            {/* {currentFriends.map((friend) => (
              <li key={friend} className="py-1 flex justify-between items-center">
                {friend}
                <Image src={doorImageUrl} width="30px" height="30px" alt="visit" />
              </li>
            ))} */}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default FriendDrawer;
