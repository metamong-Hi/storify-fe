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
import BasicBox from '@/components/boxes/basicBox';
import SmallBox from '@/components/boxes/smallBox';
import LargeBox from '@/components/boxes/largeBox';
import BorderlessBox from '@/components/boxes/BorderlessBox';
import TransparentBox from '@/components/boxes/transparentBox';

const ExamplePage = () => {
  return (
    <div>
      <BasicBox>
        기본박스
      </BasicBox>
      <SmallBox>
        작은 박스
      </SmallBox>
      <LargeBox>
        큰 박스
      </LargeBox>
      <BorderlessBox>
        테두리 없는 박스
      </BorderlessBox>
      <TransparentBox>
        투명한 박스
      </TransparentBox>

    </div>
  );
};

export default ExamplePage;