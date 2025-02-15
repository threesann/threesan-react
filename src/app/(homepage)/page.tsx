"use client";

import { useState, useEffect } from 'react';

export default function Home() {
    interface RotateElementParams {
        event: MouseEvent;
        element: HTMLElement;
    }

    const [showDesc, setShowDesc] = useState<string>("");

    useEffect(() => {
        const rotated = document.getElementById('rotate');
        document.addEventListener('mousemove', (e) => {
            rotateElement({ event: e, element: rotated as HTMLElement });
        });
    }, []);

    function rotateElement({ event, element }: RotateElementParams) { // event represents mouse movement, element is the element to rotate
        const x = event.clientX; // get the horizontal mouse position
        const y = event.clientY; // get the vertical mouse position
        
        const middleX = window.innerWidth / 2; // get the middle of the screen horizontally
        const middleY = window.innerHeight / 2; // get the middle of the screen vertically

        // note: the * [value] is the rotation amount, change this to change the severity of rotation
        const offsetX = ((x - middleX) / middleX) * 20; // get the horizontal offset from the middle of the screen
        const offsetY = ((y - middleY) / middleY) * 20; // get the vertical offset from the middle of the screen

        element.style.setProperty("--rotateX", -1 * offsetY + "deg"); // applies properties to element to rotate it
        element.style.setProperty("--rotateY", offsetX + "deg");
    }

    return (
        <div className="w-full h-full bg-nighttime animate-backgroundMove">
            <div className="flex items-center justify-center h-full w-1/5 m-auto">

                {/* change number in style of container div to change no. of elements in circle - other settings such as radius/space between elements are in globals.css */}
                {/* circle div (container) */}
                <div className="container" style={{"--m": 6} as React.CSSProperties}>

                    {/* central element - properties of rotation can be changed above, styling in globals.css */}
                    <div id="rotate" className="flex flex-col items-center p-4 h-fit w-full bg-theme-background border-4 border-theme-border shadow shadow-black/50 animate-slideUpAndFade">
                        <p className="text-4xl pb-2">threesan</p>
                        {showDesc === "" &&
                            <p className="text-center">this is my website to display everything i've ever made ever.</p>
                        }
                        {showDesc === "chatitin" && 
                            <div className='flex flex-col w-4/5'>
                                <img src="/pic_chatitin.png" className='border-4 border-theme-border' />
                                <p className='text-4xl'>CHAT IT IN</p>
                                <p className='text-sm'>Released: 16/9/2024</p>
                                <p>A chatroom for Very Special People.</p>
                                <p className='text-xs'><br />Developed by David Fiddes, Designed by threesan</p>
                            </div>
                        }
                        {showDesc === "threesangithub" && 
                            <div className='flex flex-col w-4/5'>
                                <img src="/pic_threesan.png" className='border-4 border-theme-border' />
                                <p className='text-4xl'>threesann.github.io</p>
                                <p className='text-sm'>Released: 3/6/2024</p>
                                <p>My old portfolio website. It's like a simpler version of this one.</p>
                                <p className='text-xs'><br />Developed by threesan</p>
                            </div>
                        }
                        {showDesc === "kevsterclicker" && 
                            <div className='flex flex-col w-4/5'>
                                <img src="/pic_kevsterclicker.png" className='border-4 border-theme-border' />
                                <p className='text-4xl'>Kevster Clicker</p>
                                <p className='text-sm'>Released: 10/6/2024</p>
                                <p>Perhaps the greatest & most controversial game of All Time.</p>
                                <p className='text-xs'><br />Developed by David Fiddes, Designed by threesan</p>
                            </div>
                        }
                        {showDesc === "nighttimeforest" && 
                            <div className='flex flex-col w-4/5'>
                                <img src="/pic_nighttimeforest.png" className='border-4 border-theme-border' />
                                <p className='text-4xl'>??????</p>
                                <p className='text-sm'>Released: ??/??/????</p> 
                                <p>Who knows what it could be?</p>
                                <p className='text-xs'><br />Developed by threesan</p>
                            </div>
                        }
                    </div>

                    {/* elements in circle; 1-6 */}
                    <div style={{"--i": 1} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/icon_comingsoon.png" className="w-full h-full"/>
                        </div>
                    </div>

                    <div style={{"--i": 2} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://threesann.github.io/">
                                <img src="/icon_threesan.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("threesangithub")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 3} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://kevsterclicker.com">
                                <img src="/icon_chatitin.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("chatitin")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 4} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://kevster.vercel.app">
                                <img src="/icon_kevsterclicker.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("kevsterclicker")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 5} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/icon_nighttimeforest.png" className="w-full h-full"
                                onMouseEnter={() => setShowDesc("nighttimeforest")} 
                                onMouseLeave={() => setShowDesc("")}
                            />
                        </div>
                    </div>

                    <div style={{"--i": 6} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/icon_comingsoon.png" className="w-full h-full"/>
                        </div>
                    </div>

                </div>  
            </div>
            <p className='absolute bottom-1 w-full text-center text-theme-border text-sm'>© 2025, burgerbross Sp. z o.o. (not a real company)</p>
        </div>
      
    );
  }