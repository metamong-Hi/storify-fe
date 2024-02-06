"use client"
import React,{useState,useEffect} from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';


function FriendRequest(){
    const [formRequestData, setFormRequestData] = useState({
        receiver: '',
      });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setFormRequestData({
        ...formRequestData,
        [name]: value,
      });
    };
  
    const handleFriendRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      alert('여기까지 왔다 친구신청');
      // const token=localStorage.getItem('token')
      const token=sessionStorage.getItem('token');
      const name=formRequestData.receiver;
      console.log(name);
      console.log(token);
      const status="대기";
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/friendsReqs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({receiver:name,status:status}),
        });
        const data = await response.json();
        alert(data);
        alert('친구신청됨')
    } catch (error) {
        alert("친구신청망함"+error);
        console.log(error);
    }
  }
  
   
    return (
      <div className="flex flex-col w-full" style={{ fontFamily: 'ModernGulim' }}>
        <Card className="max-w-full w-[340px] h-[400px]">
          <CardBody className="overflow-hidden">
          
                <form className="flex flex-col gap-4" onSubmit={handleFriendRequestSubmit}>
                  <Input
                    isRequired
                    label="아이디"
                    placeholder="친구 아이디를 입력하세요"
                    type="text"
                    name="receiver"
                    value={formRequestData.receiver}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
                      친구신청
                    </Button>
                  </div>
                </form>
             
          </CardBody>
        </Card>
      </div>
    );
};
export default FriendRequest;
