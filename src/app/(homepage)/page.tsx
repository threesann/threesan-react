"use client";

import { useEffect } from 'react';

export default function Home() {
    interface RotateElementParams {
        event: MouseEvent;
        element: HTMLElement;
    }

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
                    {/* central element */}
                    <div id="rotate" className="flex flex-col items-center p-4 h-fit w-full bg-theme-background border-4 border-theme-border shadow shadow-black/50 animate-slideUpAndFade">
                        <p className="text-4xl">threesan</p>
                        <p className="text-center">this is my website to display everything i've ever made ever.</p>
                    </div>
                    {/* elements in circle; 1-6 */}
                    <div style={{"--i": 1} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_chatitin.png" className="w-full h-full"/>
                        </div>
                    </div>
                    <div style={{"--i": 2} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_website.png" className="w-full h-full"/>
                        </div>
                    </div>
                    <div style={{"--i": 3} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_chatitin.png" className="w-full h-full"/>
                        </div>
                    </div>
                    <div style={{"--i": 4} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_chatitin.png" className="w-full h-full"/>
                        </div>
                    </div>
                    <div style={{"--i": 5} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_chatitin.png" className="w-full h-full"/>
                        </div>
                    </div>
                    <div style={{"--i": 6} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <img src="/icon_chatitin.png" className="w-full h-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }