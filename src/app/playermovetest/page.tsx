"use client";

import { useState } from "react";
import PlayArea from "./_components/playarea";

export default function PlayerMoveTest() {
    
    const [mode, setMode] = useState("arrow");
    const [playerName, setPlayerName] = useState("Player");
    const [playerColor, setPlayerColor] = useState("#42b3f5");
    

    return (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="w-full h-3/5 flex flex-row gap-4 items-center justify-center">
                <PlayArea mode={mode} playerName={playerName} playerColor={playerColor} />
                <div className="flex flex-col gap-1 h-full w-fit items-start justify-start">
                    <p>Player Movement Test</p>
                    <button 
                        className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black"
                        onClick={() => setMode("arrow")}
                    >
                        <img src="/playermovetest/arrow_mode.svg" className="size-8 flex-shrink-0" />
                        arrow mode
                    </button>
                    <button 
                        className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black"
                        onClick={() => setMode("click")}
                    >
                        <img src="/playermovetest/click_mode.svg" className="size-8 flex-shrink-0" />
                        click mode
                    </button>
                    <button 
                        className="flex flex-row items-center gap-2 bg-blue-900 hover:bg-blue-700 active:bg-blue-600 px-2 py-2 drop-shadow-black disabled:bg-gray-700"
                        onClick={() => setMode("physics")}
                        disabled
                    >
                        <img src="/playermovetest/physics_mode.svg" className="size-8 flex-shrink-0" />
                        physics mode
                    </button>
                </div>
            </div>
        </div>
    )
}