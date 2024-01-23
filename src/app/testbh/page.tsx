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
const TestBHPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-200 min-h-screen "> {/* Updated to bg-gray-200 */}
      <Eraser />
      <Pencil />
    </div>
  );
};

export default TestBHPage;