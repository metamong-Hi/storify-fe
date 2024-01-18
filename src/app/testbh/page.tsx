"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BasicButton from '@/components/buttons/basicButton'; // Adjust the path as necessary
import BigButton from '@/components/buttons/bigButton';
import MediumImageButton from '@/components/buttons/middleImageButton';
import LargeImageButton from '@/components/buttons/largeImageButton';
import SmallImageButton from '@/components/buttons/smallImageButton';
import ErrorPage from '@/components/errors/error';
import LoadingPage from '@/components/loadings/loading';
import SpeechBubble from '@/components/speechBubble/speechBubble';

const ExamplePage = () => {
  return (
    <div>
      <SpeechBubble
        imageSrc="/images/furnitures/speechBubble.png"
        alt="Descriptive Alt Text"
        overlayText="Your Overlay Text Here"
      />
      {/* ... other components */}
    </div>
  );
};

export default ExamplePage;