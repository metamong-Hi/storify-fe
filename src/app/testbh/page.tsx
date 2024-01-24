"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BasicButton from '@/components/buttons/basicButton'; // Adjust the path as necessary
import BigButton from '@/components/buttons/bigButton';
import MediumImageButton from '@/components/buttons/mediumImageButton';
import LargeImageButton from '@/components/buttons/largeImageButton';
import SmallImageButton from '@/components/buttons/smallImageButton';
import ErrorPage from '@/components/errors/error';
import LoadingPage from '@/components/loadings/loading';
import SpeechBubble from '@/components/objects/speechBubble/speechBubble';
import BasicBox from '@/components/objects/boxes/basicBox';
import SmallBox from '@/components/objects/boxes/smallBox';
import LargeBox from '@/components/objects/boxes/largeBox';
import BorderlessBox from '@/components/objects/boxes/BorderlessBox';
import TransparentBox from '@/components/objects/boxes/transparentBox';
import SimpleWritingForm from '@/components/forms/simpleWritingForm';
import Card from '@/components/objects/cards/card';
import ClusterCard from '@/components/objects/cards/clusterCard';
import ClusterCardContainer from '@/components/objects/cards/clusterCardContainer';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';
import MenuBar from '@/components/menubar/menuBar';
// import ColorfulBackground from '@/components/background/background';


const TestBH: React.FC = () => {
  return (
    <div className="w-screen min-h-[600vh]">
      <div className="h-[100vh] w-full bg-pastelRed flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">AI요정이 생성해 주는 동화</h1>
      </div>
      <div className="h-[100vh] w-full bg-pastelOrange flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">텍스트 2</h1>
      </div>
      <div className="h-[100vh] w-full bg-pastelYellow flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">텍스트 3</h1>
      </div>
      <div className="h-[100vh] w-full bg-pastelGreen flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">텍스트 1</h1>
      </div>
      <div className="h-[100vh] w-full bg-pastelBlue flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">텍스트 2</h1>
      </div>
      <div className="h-[100vh] w-full bg-pastelPurple flex justify-center items-start pt-20">
        <h1 className="text-6xl font-bold text-white">텍스트 3</h1>
      </div>
      

      
    </div>
  );
}

export default TestBH;