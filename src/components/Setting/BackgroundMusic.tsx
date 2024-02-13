import React, { useState, useEffect, useRef } from 'react';
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import { HeartIcon } from "../../../public/icons/HeartIcon";
import { PauseCircleIcon } from "../../../public/icons/PauseCircleIcon";
import { NextIcon } from "../../../public/icons/NextIcon";
import { PreviousIcon } from "../../../public/icons/PreviousIcon";
import { PlayCircleIcon } from "../../../public/icons/PlayCircleIcon";
import { RepeatOneIcon } from "../../../public/icons/ReapeatIcon";
import { ShuffleIcon } from "../../../public/icons/ShuffleIcon";

export default function BackgroundMusic() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(new Audio());
  const tracks = [
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/Chopin - Nocturne op.9 No.2 (320kbps)-1707833466113.mp3',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/Chopin_ Berceuse in D-flat major, Op.57 (Michelangeli, Rubinstein, Moravec, Ashkenazy, Pollini) (320kbps)-1707833498326.mp3',
    // 더 많은 트랙들...
  ];

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex];
    audioRef.current.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else {
      setCurrentTrackIndex(tracks.length - 1);
    }
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 min-w-[40vw]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">

          <div className="flex flex-col col-span-6 md:col-span-12">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">배경 음악</h3>
                <p className="text-small text-foreground/80">12개 트랙</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={handlePrevious}
              >
                <PreviousIcon />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={handlePlayPause}
              >
                {isPlaying ? <PauseCircleIcon size={54} /> : <PlayCircleIcon size={54} />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={handleNext}
              >
                <NextIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
