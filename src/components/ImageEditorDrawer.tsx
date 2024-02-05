"use client"
import React, { useState,useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
interface ImageEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void; 
  onImageDrop: (files: File[]) => void; 
  hellopage: string | number;
  bookId: string | number; 
  imageUrls: string[];
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, imageUrl: string) => void;
}
interface ImageData {
  base64: string;
}


const ImageEditorDrawer: React.FC<ImageEditorDrawerProps> = ({ isOpen, onClose,  hellopage, bookId }) => {

  const [editedImageUrl, setEditedImageUrl] = useState('');

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const token=sessionStorage.getItem('token');
  const realPageNumber=(Number(hellopage)+2)/2;
  console.log("내가 제대로 계산한게 맞나"+realPageNumber);

  const fetchImages = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/ai/books/${bookId}/${realPageNumber}/new-images`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(`api/ai/books/${bookId}/${realPageNumber}/new-images`);
      console.log("요청은 보냈음");
      if (!response.ok) {
        throw new Error('이미지 못사져옴');
      }
      
      const data: ImageData[] = await response.json(); 
      console.log(data);
      
      const fetchedImageUrls = data.map((imageData: ImageData) => imageData.base64);
      setImageUrls(fetchedImageUrls); 



    } catch (error) {
      console.error('오류:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [hellopage, bookId]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, imageUrl: string) => {
    e.dataTransfer?.setData('text/plain', imageUrl);
  };
  console.log(hellopage+"여기 페이지 넘어왔다");
  console.log("북아이디다"+bookId);
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose} variant={"persistent"}>
      <List>
        <ListItem>
          <ListItemText primary="이미지 편집" />
        </ListItem>
      </List>
        <div
        // onDrop={(e) => handleDrop(e, 0)}
        onDragOver={handleDragOver}
        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        {imageUrls.length === 0 ? (
        <div>Loading...</div>
      ) : (
        imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, imageUrl)}
            onDragOver={handleDragOver}
            style={{
              width: 'calc(25% - 10px)',
              height: '200px',
              border: '2px dashed #ddd',
              borderRadius: '20px',
            }}
          >
            <Image
              src={`data:image/jpeg;base64,${imageUrl}`}
              alt={`편집 중인 이미지 ${index + 1}`}
              width={200}
              height={200}
              layout="fixed"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: '20px',
              }}
            />
          </div>
        ))
      )}
         
      </div>
    </Drawer>
  );
};

export default ImageEditorDrawer;
