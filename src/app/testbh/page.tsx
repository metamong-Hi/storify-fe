"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import MediumImageButton from '@/components/buttons/imageButtons/mediumImageButton';
import LargeImageButton from '@/components/buttons/imageButtons/largeImageButton';
import SmallImageButton from '@/components/buttons/imageButtons/smallImageButton';
import ErrorPage from '@/components/errors/error';
import LoadingPage from '@/components/loadings/loading';
import BasicBox from '@/components/objects/boxes/basicBox';
import SmallBox from '@/components/objects/boxes/smallBox';
import LargeBox from '@/components/objects/boxes/largeBox';
import BorderlessBox from '@/components/objects/boxes/BorderlessBox';
import TransparentBox from '@/components/objects/boxes/transparentBox';
import SimpleWritingForm from '@/components/forms/writingForms/simpleWritingForm';
import EventsWritingForm from '@/components/forms/writingForms/eventsWritingForm';
import PeopleWritingForm from '@/components/forms/writingForms/peopleWritingForm';
import BackgroundWritingForm from '@/components/forms/writingForms/backgroundWritingForm';
import Card from '@/components/objects/cards/customCards/card';
import ClusterCard from '@/components/objects/cards/customCards/clusterCard';
import ClusterCardContainer from '@/components/objects/cards/customCards/clusterCardContainer';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';
import MenuBar from '@/components/menubar/menuBar';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';
import NextUICard from '@/components/objects/cards/simpleWritingForm';
import StoryChoiceForm from '@/components/forms/choiceForms/storyChoiceForm';
import Drawer from '@/components/drawer/friend';
import FriendPage from '@/components/drawer/friendPage';


const TestBH: React.FC = () => {
  const [formText, setFormText] = useState('');

  const handleEraserClick = () => {
    setFormText('');
  };

  const menuItems = [
    { text: '홈', url: '/' },
    { text: '프로필', url: '/profile' },
    { text: '책장 1', url: '/'},
    { text: '책장 2', url: '/'},
    { text: '책장 3', url: '/'},
    { text: '책장 4', url: '/'},
  ];

  const handleCardClick = () => {
    console.log('클릭');
  };
  return (
    <div className="w-screen min-h-[1200vh]">
      <div className="h-[100vh] w-full bg-pastelOrange flex flex-col items-center pt-1">
        <h1 className="text-6xl font-bold text-white mb-4">친구 탭</h1>
        <FriendPage />
      </div>
      <div className="h-[100vh] w-full bg-pastelYellow flex flex-col  items-center p-1">
        <h1 className="text-6xl font-bold text-white mb-4">고급 생성(등장인물)</h1>
        <PeopleWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
      </div>
      <div className="h-[100vh] w-full bg-pastelGreen flex flex-col  items-center p-1">
        <h1 className="text-6xl font-bold text-white mb-4">고급 생성(사건)</h1>
        <EventsWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
      </div>
      <div className="h-[100vh] w-full bg-pastelBlue flex flex-col  items-center p-1">
        <h1 className="text-6xl font-bold text-white mb-4">고급 생성(시간적, 공간적 배경)</h1>
        <BackgroundWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
      </div>
      <div className="h-[100vh] w-full bg-pastelPurple flex flex-col  items-center p-1">
        <h1 className="text-6xl font-bold text-white mb-4">텍스트 3</h1>
        <StoryChoiceForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
      </div>
      
    </div>
  );
}

export default TestBH;