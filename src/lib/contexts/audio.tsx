"use client";

import { createContext, useContext } from "react";

interface AudioContextType {
  play: (url: string) => void;
}
export const AudioContext = createContext<AudioContextType>(null!);

interface AudioProviderProps {
  children: React.ReactNode;
}
export default function AudioProvider({ children }: AudioProviderProps) {
  function play(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  return <AudioContext.Provider value={{ play }}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  return useContext(AudioContext);
}

// :3
// made by david fiddes