"use client";

import AudioPlayer from "./_components/AudioPlayer";
import * as Sounds from "@/lib/soundboard/sounds";
import { useState, useEffect } from "react";

export default function Soundboard() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [currentSongTitle, setCurrentSongTitle] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    // scroll handling
    const sections: HTMLElement[] = Array.from(
      document.querySelectorAll(".section")
    ) as HTMLElement[]; // sections in code automatically added

    let currentSection = 0;
    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      isScrolling = true;
      const delta = event.deltaY;

      if (delta > 0) {
        console.log("scrolling down");
        currentSection = Math.min(currentSection + 1, sections.length - 1);
      } else {
        console.log("scrolling up");
        currentSection = Math.max(currentSection - 1, 0);
      }

      sections[currentSection].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // delay to prevent multiple scrolls
      setTimeout(() => {
        isScrolling = false;
      }, 390); // ran some tests; 390ms is the average time it takes scrollIntoView to scroll 100vh. it's a little janky, but it works, as they'll all be screen height
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-fit">
      <a
        className="fixed top-0 left-1 text-white/75 hover:text-white hover:underline hover:uppercase"
        href="/"
      >
        {"<"} back to main
      </a>

      <div className="section w-4/5 h-screen mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">soundboard</h1>
        <p>a series of sounds, famous for their uses in different projects.</p>
        <div className="w-3/5 flex flex-col md:grid grid-cols-4 mt-4 gap-1">
          {Sounds.SoundboardSounds.map((sound, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className="border-double border-4 w-full border-white text-white hover:bg-white hover:text-black hover:border-black px-4 py-2 rounded"
                onClick={() => new Audio(sound.file).play()}
              >
                {sound.title}
              </button>
            </div>
          ))}
        </div>
        <div className="absolute bottom-1 h-fit w-full flex flex-row items-center justify-center gap-2 px-10 animate-slideUpAndFadeAndBob">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white" />
          <p className="text-center text-white text-2xl">SCROLL FOR SONGS</p>
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white" />
        </div>
      </div>

      <div className="section relative w-4/5 h-screen mx-auto flex md:flex-row flex-col items-center justify-center">
        {["KevsterSongs", "OtherSongs"].map((category) => (
          <div
            key={category}
            className="md:w-1/2 w-full h-4/5 flex flex-col items-center md:justify-start justify-center"
          >
            <h1 className="text-4xl">
              {category === "KevsterSongs" ? "kevster songs" : "other songs"}
            </h1>
            <p className="md:block hidden">
              {category === "KevsterSongs"
                ? "songs from hit game Kevster Clicker"
                : "songs from various other projects"}
            </p>

            {Sounds.KevsterSongs.concat(Sounds.OtherSongs)
              .filter((sound) =>
                category === "KevsterSongs"
                  ? Sounds.KevsterSongs.includes(sound)
                  : Sounds.OtherSongs.includes(sound)
              )
              .map((sound) => {
                const uniqueIndex = Sounds.KevsterSongs.concat(Sounds.OtherSongs).indexOf(sound);
                return (
                  <AudioPlayer
                    key={`${category}-${uniqueIndex}`}
                    index={uniqueIndex}
                    sound={sound}
                    playingIndex={playingIndex}
                    setPlayingIndex={setPlayingIndex}
                    setCurrentSongTitle={setCurrentSongTitle}
                    setElapsedTime={setElapsedTime}
                    setDuration={setDuration}
                  />
                );
              })}
          </div>
        ))}

        <div className="md:absolute w-full bottom-5 flex flex-col items-center text-center">
          <p className="text-white/75">currently playing:</p>
          <p
            key={currentSongTitle}
            className={`md:text-4xl text-2xl animate-slideRightAndFade ${
              currentSongTitle ? "text-white" : "text-white/75"
            }`}
          >
            {currentSongTitle ? currentSongTitle : "nothing"}
          </p>
          {playingIndex !== null && (
            <p className="text-white/75">
              {formatTime(elapsedTime)} / {formatTime(duration)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
