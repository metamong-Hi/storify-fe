import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';

const ImageEditorDrawer = ({ isOpen, onClose, onImageDrop }) => {
  const [editedImageUrl, setEditedImageUrl] = useState('');
  // const [imageList, setImageList] = useState(Array(4).fill(null));
  const [imageUrls, setImageUrls] = useState([
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai1-1706699591500.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai2-1706699626175.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai3-1706699643732.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai6-1706699685087.jpeg',
  ]);

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const droppedImageUrl = e.dataTransfer.getData('text/plain');

  //  const updatedImageUrls = [...imageUrls];
  //  updatedImageUrls[index] = droppedImageUrl;
  //  setImageUrls(updatedImageUrls);
   

  //  setEditedImageUrl(droppedImageUrl);
   
  //  onImageDrop(droppedImageUrl);
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragStart = (e, imageUrl) => {
    e.dataTransfer.setData('text/plain', imageUrl);
  };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose} variant={"persistent"}>
      <List>
        <ListItem>
          <ListItemText primary="이미지 편집" />
        </ListItem>
      </List>
      {/* <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ width: '100%', height: '100%', border: '2px dashed #ddd', borderRadius: '20px' }}
      >
        <Image src={editedImageUrl} alt="편집 중인 이미지" width={200} height={200} />
      </div> */}
        <div
        // onDrop={(e) => handleDrop(e, 0)}
        onDragOver={handleDragOver}
        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        {imageUrls.map((imageUrl, index) => (
         <div
      key={index}
      draggable 
      onDragStart={(e) => handleDragStart(e, imageUrl)} 
      // onDrop={(e) => handleDrop(e, index)}
      onDragOver={handleDragOver}
      style={{
        width: 'calc(25% - 10px)',
        height: '200px',
        border: '2px dashed #ddd',
        borderRadius: '20px',
      }}
    >
             <Image
    src={imageUrl}
    alt={`편집 중인 이미지 ${index + 1}`}
    width={200} // 이미지의 너비 설정
    height={200} // 이미지의 높이 설정
    layout="fixed" // 이미지 크기 고정 설정
    style={{
      objectFit: 'cover', // 이미지를 div에 맞게 크롭
      width: '100%',
      height: '100%',
      borderRadius: '20px',
    }}
  />
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default ImageEditorDrawer;
