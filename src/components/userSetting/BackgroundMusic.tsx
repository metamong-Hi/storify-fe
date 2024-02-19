'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardBody, Button, Slider } from '@nextui-org/react';
import { PauseCircleIcon } from '../../../public/icons/PauseCircleIcon';
import { NextIcon } from '../../../public/icons/NextIcon';
import { PreviousIcon } from '../../../public/icons/PreviousIcon';
import { PlayCircleIcon } from '../../../public/icons/PlayCircleIcon';

const tracks = [
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Chopin - Nocturne op.9 No.2 (320kbps)-1707833466113.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Chopin_ Berceuse in D-flat major, Op.57 (Michelangeli, Rubinstein, Moravec, Ashkenazy, Pollini) (320kbps)-1707833498326.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Claude Debussy - Reverie L.68 (320kbps)-1707883349989.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Consolations, S. 172_ No. 3, Lento placido (320kbps)-1707883444694.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Daydreaming - Luke Faulkner (320kbps)-1707883459633.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Debussy _ Arabesque No.1 - Andantino con moto (320kbps)-1707883473170.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Debussy. Preludios. Libro I. Preludio nÂº 8 La fille aux cheveux de lin (320kbps)-1707883487764.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Douze eÌtudes, Op. 25_ No. 1 in A-Flat Major __Aeolian Harp__ (320kbps)-1707883501464.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Erik Satie - GymnopeÌdie No.1 (320kbps)-1707883514234.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/J.S. Bach_ Orchestral Suite No. 3 in D Major, BWV 1068 - II. Air (320kbps)-1707883553691.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Liebestraum No. 3 in A-Flat Major, S. 541_3 (320kbps)-1707883565474.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Lyric Pieces, Op. 38_ No. 1, Cradle Song (320kbps)-1707883577894.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Schumann_ Kinderszenen Op.15 No.7, TraÌumerei (Horowitz) (320kbps)-1707883590764.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/Suite bergamasque, L. 75_ III. Clair de lune (320kbps)-1707883611794.mp3',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/The Carnival of the Animals_ XIII, The Swan (320kbps)-1707883629105.mp3',
];

const MusicName = [
  '쇼팽-녹턴',
  '쇼팽-자장가',
  '드뷔시-꿈',
  '리스트-위로곡',
  '포크너-백일몽',
  '드뷔시-아라베스크',
  '드뷔시-갈색머리의 소녀',
  '쇼팽-연습곡 13번',
  '에릭 사티-제전',
  '바흐-G선상의 아리아',
  '리스트-사랑의 노래',
  '그리그- 서정 소곡집 2권',
  '슈만-어린이 정경',
  '드뷔시-베르가마스크 모음곡',
  '생상스-동물의 사육제 백조',
];

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio(tracks[0]));
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const handlePrevious = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = prevIndex > 0 ? prevIndex - 1 : tracks.length - 1;
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Playback failed', error);
              setIsPlaying(false);
            });
        }
      }, 10);
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(tracks[currentTrackIndex]);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setTrackDuration(audioRef.current?.duration || 0);
      });

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Audio playback failed:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const updateDuration = () => {
      setTrackDuration(audioRef.current.duration);
    };
    audioRef.current.addEventListener('loadedmetadata', updateDuration);
    return () => {
      audioRef.current.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const handlePlayTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
  }, []);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex];
    audioRef.current.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }, [currentTrackIndex]);

  const handleNext = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = prevIndex < tracks.length - 1 ? prevIndex + 1 : 0;
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Playback failed', error);
              setIsPlaying(false);
            });
        }
      }, 10);
      return nextIndex;
    });
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }, [handleNext]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex];
    audioRef.current.load();
    setTrackDuration(audioRef.current.duration);
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    }
  }, [currentTrackIndex, isPlaying, startTimer]);

  useEffect(() => {
    const currentAudio = audioRef.current;

    return () => {
      if (currentAudio) {
        currentAudio.pause();
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const onScrub = (value: number | number[]) => {
    const scrubValue = Array.isArray(value) ? value[0] : value;

    clearInterval(intervalRef.current);
    audioRef.current.currentTime = scrubValue;
    setTrackProgress(audioRef.current.currentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    const updateProgress = () => {
      setTrackProgress(audioRef.current?.currentTime || 0);
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
  
    const handleAudioEnd = () => {
      handleNext();
    };
  
    audio.addEventListener('ended', handleAudioEnd);
  
    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [handleNext]);
  

  useEffect(() => {
    const storedTrackIndex = localStorage.getItem('currentTrackIndex');
    if (storedTrackIndex) {
      setCurrentTrackIndex(parseInt(storedTrackIndex, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 min-w-[50vw]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="flex flex-col col-span-6 md:col-span-12">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">배경 음악</h3>
                  <p className="text-small text-foreground/80">15개 트랙</p>
                  <h1 className="text-large font-medium mt-2">{MusicName[currentTrackIndex]}</h1>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: 'bg-default-500/30',
                    thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
                  }}
                  color="foreground"
                  value={trackProgress}
                  maxValue={trackDuration}
                  onChange={onScrub}
                  step={0.1}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-small">{formatTime(trackProgress)}</p>
                  <p className="text-small text-foreground/50">{formatTime(trackDuration)}</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className=" w-auto h-auto data-[hover]:bg-foreground/10"
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
                  className="w-auto h-auto data-[hover]:bg-foreground/10"
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
      <div className="flex justify-center mt-4">
        <ul className="track-list menu bg-base-200 min-w-[50vw] rounded-box">
          {MusicName.map((name, index) => (
            <li
              key={index}
              className={`track-item text-xl text-base-content ${currentTrackIndex === index ? 'active' : ''}`}
              onClick={() => handlePlayTrack(index)}
            >
              <a >
                {index + 1}. {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BackgroundMusic;
