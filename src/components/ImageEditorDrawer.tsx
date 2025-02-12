'use client';
import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
interface ImageEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hellopage: string | number;
  bookId: string | number;
  imageUrls: string[];
  onEdit: () => void;
  onDelete: () => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, imageUrl: string) => void;
}

const ImageEditorDrawer: React.FC<ImageEditorDrawerProps> = ({
  isOpen,
  onClose,
  hellopage,
  bookId,
  onEdit,
  onDelete,
}) => {
  const [editedImageUrl, setEditedImageUrl] = useState('');

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const token = sessionStorage.getItem('token');
  const realPageNumber = (Number(hellopage) + 2) / 2;



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/ai/books/${bookId}/${realPageNumber}/new-images`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (!response.ok) {
          throw new Error('이미지 못사져옴');
        }
  
        const data: string[] = await response.json();
        setImageUrls(data);
      } catch (error) {
        console.error('오류:', error);
      }
    };
    
    fetchImages();
  }, [hellopage, bookId,realPageNumber, token]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, imageUrl: string) => {
    e.dataTransfer?.setData('text/plain', imageUrl);
  };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose} variant="persistent">
      <List>
        <ListItem>
          <ListItemText primary="그림바꾸기" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginRight: '20px',
            }}
          >
            <Button onClick={onEdit} size="lg" style={{ backgroundColor: '#ABD6A8' }}>
              저장
            </Button>
            <Button onClick={onDelete} size="lg">
              취소
            </Button>
          </div>
        </ListItem>
      </List>
      <div
        // onDrop={(e) => handleDrop(e, 0)}
        onDragOver={handleDragOver}
        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        {imageUrls.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.75rem',
              gap: '20px',
              width: '100%',
              margin: 'auto',
            }}
          >
            <div>
              <p>잠시만 기다려주세요!</p>
              <div className="mx-auto">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.75rem',
                    gap: '20px',
                    width: '100%',
                    margin: 'auto',
                  }}
                >
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            </div>
          </div>
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
