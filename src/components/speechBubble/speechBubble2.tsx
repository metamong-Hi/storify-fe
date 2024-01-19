"use client"
import React, { useState } from 'react';
import SpeechBubble from '@/components/speechBubble/speechBubble';

const SpeechBubble2 = () => {
  return (
    <div>
      <SpeechBubble
        imageSrc="/images/furnitures/speechBubble.png"
        alt="Descriptive Alt Text"
        overlayText="Your Overlay Text Here"
      />

    </div>
  );
};

export default SpeechBubble2;