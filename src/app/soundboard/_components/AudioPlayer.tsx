import React, { useState } from "react";

interface AudioPlayerProps {
  index: number;
  sound: {
    title: string;
    file: string;
    description?: string;
  };
  playingIndex: number | null;
  setPlayingIndex: (index: number | null) => void;
  setCurrentSongTitle: (title: string | null) => void;
  setElapsedTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  index,
  sound,
  playingIndex,
  setPlayingIndex,
  setCurrentSongTitle,
  setElapsedTime,
  setDuration,
}) => {
  const handleAudioPlay = () => {
    const audio = document.getElementById(`audio-${index}`) as HTMLAudioElement;

    if (playingIndex === index) {
      // Pause if the same audio is playing
      audio.pause();
      audio.currentTime = 0; // Reset the current time
      setPlayingIndex(null);
      setCurrentSongTitle(null);
      setElapsedTime(0); // Reset elapsed time
      setDuration(0); // Reset duration
    } else {
      // Pause any currently playing audio
      if (playingIndex !== null) {
        const currentlyPlayingAudio = document.getElementById(
          `audio-${playingIndex}`
        ) as HTMLAudioElement;
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0; // Reset the current time
        setElapsedTime(0); // Reset elapsed time
        setDuration(0); // Reset duration
      }

      // Play the selected audio
      audio.play();
      setPlayingIndex(index);
      setCurrentSongTitle(sound.title); // Update the song title
      setDuration(audio.duration); // Set the duration of the song

      // Update elapsed time as the song plays
      audio.ontimeupdate = () => {
        setElapsedTime(audio.currentTime);
      };
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col items-center gap-2">
      <div className="w-full text-white px-4 py-2 rounded flex flex-row gap-4 items-center justify-between">
        <div className="flex flex-col justify-start">
          <p className="text-xl leading-tight">{sound.title}</p>
          <p className="text-sm text-white/75 leading-tight md:block hidden">
            {sound.description}
          </p>
        </div>

        <audio id={`audio-${index}`} src={sound.file}></audio>

        <button
          className="group size-8 flex-shrink-0"
          onClick={handleAudioPlay}
        >
          <img
            src={
              playingIndex === index
                ? "/soundboard/pause.svg"
                : "/soundboard/play.svg"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;