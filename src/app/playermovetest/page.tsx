"use client";

import { useState } from "react";
import PlayArea from "./_components/playarea";

export default function PlayerMoveTest() {
  const [mode, setMode] = useState("arrow");
  const [playerName, setPlayerName] = useState("david");
  const [playerColor, setPlayerColor] = useState("#42b3f5");

  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <a
        className="fixed top-0 left-1 text-white/75 hover:text-white hover:underline hover:uppercase"
        href="/"
      >
        {"<"} back to main
      </a>
      <div className="w-full h-3/5 flex flex-row gap-4 items-center justify-center">
        <PlayArea
          mode={mode}
          playerName={playerName}
          playerColor={playerColor}
        />
        <div className="flex flex-col gap-1 h-full w-fit items-start justify-start">
          <p>Player Movement Test</p>
          <button
            className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black"
            onClick={() => setMode("arrow")}
          >
            <img
              src="/playermovetest/arrow_mode.svg"
              className="size-8 flex-shrink-0"
            />
            arrow mode
          </button>
          <button
            className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black"
            onClick={() => setMode("click")}
          >
            <img
              src="/playermovetest/click_mode.svg"
              className="size-8 flex-shrink-0"
            />
            click mode
          </button>
          <button
            className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black disabled:bg-gray-700"
            onClick={() => setMode("physics")}
            disabled
          >
            <img
              src="/playermovetest/physics_mode.svg"
              className="size-8 flex-shrink-0"
            />
            physics mode
          </button>
          <input
            type="text"
            onChange={(event) => setPlayerName(event.target.value)}
            value={playerName}
            className="bg-blue-950 text-white px-2 py-1 border-2 border-blue-900 hover:border-blue-700 focus:bg-blue-800 shaow-inner shadow-black/50"
          ></input>
          <input
            type="color"
            onChange={(event) => setPlayerColor(event.target.value)}
            value={playerColor}
            className="bg-blue-950 text-white px-1 border-2 border-blue-900 hover:border-blue-700 focus:bg-blue-800 shaow-inner shadow-black/50"
          ></input>
        </div>
      </div>
    </div>
  );
}
