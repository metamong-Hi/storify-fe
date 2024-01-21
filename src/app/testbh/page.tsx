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
import SpeechBubble from '@/components/speechBubble/speechBubble';
import BasicBox from '@/components/boxes/basicBox';
import SmallBox from '@/components/boxes/smallBox';
import LargeBox from '@/components/boxes/largeBox';
import BorderlessBox from '@/components/boxes/BorderlessBox';
import TransparentBox from '@/components/boxes/transparentBox';
import SimpleWritingForm from '@/components/forms/simpleWritingForm';

const TestBHPage: React.FC = () => {
  return (
    <div className="p-4">
      <LoadingPage />
    </div>
  );
};

export default TestBHPage;
