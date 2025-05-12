"use client";

import { useState, useEffect, useRef } from "react";

interface PlayAreaProps {
    mode: string;
    playerName?: string;
    playerColor?: string;
}

export default function PlayArea({
    mode,
    playerName,
    playerColor,
}: PlayAreaProps) {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [playerSpeed, setPlayerSpeed] = useState(5);
    const [playerAngle, setPlayerAngle] = useState(0);
    const [playerSize, setPlayerSize] = useState(50);

    const [objects, setObjects] = useState([
        { x: 100, y: 100, size: 60, color: "red", name: "Object 1" },
        { x: 200, y: 200, size: 80, color: "green", name: "Object 2" },
        { x: 300, y: 300, size: 80, color: "orange", name: "Object 3" },
    ]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [flags, setFlags] = useState<{ x: number; y: number }[]>([]); // Store flag positions
    const [currentTarget, setCurrentTarget] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });
    const areaRef = useRef<HTMLDivElement>(null);

    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // const [isMoving, setIsMoving] = useState(false);

    const [keysPressed, setKeysPressed] = useState({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    });

    useEffect(() => {
        // Reset flags and current target when mode changes
        setFlags([]);
        setCurrentTarget(null);
    }, [mode]);

    // Measure parent div dimensions
    useEffect(() => {
        const updateParentSize = () => {
            if (areaRef.current) {
                const rect = areaRef.current.getBoundingClientRect();
                setAreaSize({ width: rect.width, height: rect.height });
            }
        };

        updateParentSize();
        window.addEventListener("resize", updateParentSize);

        return () => {
            window.removeEventListener("resize", updateParentSize);
        };
    }, []);

    // Function to check collision between two rectangles
    const isColliding = (
        rect1: { x: number; y: number; size: number },
        rect2: { x: number; y: number; size: number }
    ) => {
        return !(
            (
                rect1.x + rect1.size < rect2.x || // rect1 is to the left of rect2
                rect1.x > rect2.x + rect2.size || // rect1 is to the right of rect2
                rect1.y + rect1.size < rect2.y || // rect1 is above rect2
                rect1.y > rect2.y + rect2.size
            ) // rect1 is below rect2
        );
    };

    if (mode === "arrow") {
        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (!arrowKeys.includes(event.key)) return; // Ignore other keys
                setKeysPressed((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: true,
                }));
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                if (!arrowKeys.includes(event.key)) return; // Ignore other keys
                setKeysPressed((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: false,
                }));
            };

            const movePlayer = () => {
                setPlayerPos((prevPos) => {
                    let newX = prevPos.x;
                    let newY = prevPos.y;

                    if (keysPressed["ArrowUp"]) newY -= playerSpeed;
                    if (keysPressed["ArrowDown"]) newY += playerSpeed;
                    if (keysPressed["ArrowLeft"]) newX -= playerSpeed;
                    if (keysPressed["ArrowRight"]) newX += playerSpeed;

                    if (newX > areaSize.width - playerSize)
                        newX = areaSize.width - playerSize;
                    if (newY > areaSize.height - playerSize)
                        newY = areaSize.height - playerSize;
                    if (newX < 0) newX = 0;
                    if (newY < 0) newY = 0;

                    // Check for collisions with objects
                    const playerRect = { x: newX, y: newY, size: playerSize };
                    for (const obj of objects) {
                        if (
                            isColliding(playerRect, {
                                x: obj.x,
                                y: obj.y,
                                size: obj.size,
                            })
                        ) {
                            return prevPos; // If collision, return previous position
                        }
                    }

                    return { x: newX, y: newY };
                });
            };

            const interval = setInterval(movePlayer, 1000 / 60); // 60 FPS

            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);

            return () => {
                clearInterval(interval);
                window.removeEventListener("keydown", handleKeyDown);
                window.removeEventListener("keyup", handleKeyUp);
            };
        }, [keysPressed, playerSpeed]);
    } else if (mode === "click") {
        useEffect(() => {
            if (mode === "click") {
                const handleMouseClick = (event: MouseEvent) => {
                    if (areaRef.current) {
                        const rect = areaRef.current.getBoundingClientRect();
                        const newFlag = {
                            x: event.clientX - rect.left,
                            y: event.clientY - rect.top,
                        };
                        setFlags((prevFlags) => [...prevFlags, newFlag]); // Add new flag to the list
                    }
                };

                window.addEventListener("click", handleMouseClick);

                const handleMouseMove = (event: MouseEvent) => {
                    if (areaRef.current) {
                        const rect = areaRef.current.getBoundingClientRect();
                        setMousePos({
                            x: event.clientX - rect.left,
                            y: event.clientY - rect.top,
                        });
                    }
                };
                window.addEventListener("mousemove", handleMouseMove);

                const interval = setInterval(() => {
                    if (!currentTarget && flags.length > 0) {
                        // Check if the flag is within bounds
                        if (flags[0].x > areaSize.width - playerSize)
                            flags[0].x = areaSize.width - playerSize;
                        if (flags[0].y > areaSize.height - playerSize)
                            flags[0].y = areaSize.height - playerSize;
                        if (flags[0].x < 0) flags[0].x = 0;
                        if (flags[0].y < 0) flags[0].y = 0;

                        setCurrentTarget(flags[0]); // Set the first flag as the target
                    }

                    if (currentTarget) {
                        setPlayerPos((prevPos) => {
                            let newX = prevPos.x;
                            let newY = prevPos.y;

                            if (
                                Math.abs(currentTarget.x - prevPos.x) <=
                                    playerSpeed &&
                                Math.abs(currentTarget.y - prevPos.y) <=
                                    playerSpeed
                            ) {
                                // Target reached
                                setFlags((prevFlags) => prevFlags.slice(1)); // Remove the reached flag -- DOESNT WORK PROPERLY
                                if (flags.length > 1) {
                                    setCurrentTarget(flags[1]); // Set the next flag as the target
                                } else {
                                    setCurrentTarget(null); // Clear the current target
                                }
                                return currentTarget; // Snap to the target position
                            }

                            if (currentTarget.x > prevPos.x - playerSpeed)
                                newX += playerSpeed;
                            if (currentTarget.x < prevPos.x + playerSpeed)
                                newX -= playerSpeed;
                            if (currentTarget.y > prevPos.y - playerSpeed)
                                newY += playerSpeed;
                            if (currentTarget.y < prevPos.y + playerSpeed)
                                newY -= playerSpeed;

                            // Check for collisions with walls
                            if (newX > areaSize.width - playerSize)
                                newX = areaSize.width - playerSize;
                            if (newY > areaSize.height - playerSize)
                                newY = areaSize.height - playerSize;
                            if (newX < 0) newX = 0;
                            if (newY < 0) newY = 0;

                            // Check for collisions with objects
                            const playerRect = {
                                x: newX,
                                y: newY,
                                size: playerSize,
                            };
                            for (const obj of objects) {
                                if (
                                    isColliding(playerRect, {
                                        x: obj.x,
                                        y: obj.y,
                                        size: obj.size,
                                    })
                                ) {
                                    setCurrentTarget(null); // Clear the current target
                                    setFlags([]); // Clear the flags
                                    return prevPos; // Stop movement if collision occurs
                                }
                            }

                            // // Update player angle
                            // setPlayerAngle(
                            //     Math.atan2(
                            //         currentTarget.y - newY,
                            //         currentTarget.x - newX
                            //     ) *
                            //         (180 / Math.PI)
                            // );

                            return { x: newX, y: newY };
                        });
                    }
                }, 1000 / 60); // 60 FPS

                return () => {
                    window.removeEventListener("click", handleMouseClick);
                    window.removeEventListener("mousemove", handleMouseMove);
                    clearInterval(interval);
                };
            }
        }, [flags, currentTarget, playerPos]);
    }

    return (
        <div className="w-2/5 h-full bg-white" ref={areaRef}>
            <div className="w-full h-full bg-gray-200 relative">
                <div
                    className={`absolute shadow-sm shadow-black/50 z-20`}
                    style={{
                        width: playerSize,
                        height: playerSize,
                        top: playerPos.y,
                        left: playerPos.x,
                        transform: `rotate(${playerAngle}deg)`,

                        backgroundColor: playerColor,
                    }}
                >
                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 drop-shadow-black">
                        {playerName}
                    </span>
                </div>

                {/* Render multiple objects */}
                {objects.map((pos, index) => (
                    <div
                        key={index}
                        className={`absolute`}
                        style={{
                            top: pos.y,
                            left: pos.x,
                            width: pos.size,
                            height: pos.size,
                            backgroundColor: pos.color,
                        }}
                    ></div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <p>
                    X: {playerPos.x} Y:{playerPos.y}
                </p>
                {mode === "arrow" && (
                    <p>
                        KEYS PRESSED:
                        <br /> {JSON.stringify(keysPressed)}
                    </p>
                )}
                {mode === "click" && (
                    <p>
                        MOUSE X: {mousePos.x} Y: {mousePos.y}
                        <br />
                        FLAGS: {JSON.stringify(flags)}
                        <br />
                        CURRENT TARGET: {JSON.stringify(currentTarget)}
                    </p>
                )}
            </div>
        </div>
    );
}
