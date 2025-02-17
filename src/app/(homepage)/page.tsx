"use client";

import { useState, useEffect, useRef } from 'react';

import Descriptions from '@/lib/homepage/sitedescriptions';


export default function Home() {
    interface RotateElementParams {
        event: MouseEvent;
        element: HTMLElement;
    }

    const [showDesc, setShowDesc] = useState<string>("");
    const currentDescription = Descriptions.find(desc => desc.name === showDesc);

    

    useEffect(() => {
        const rotated = document.getElementById('rotate');
        document.addEventListener('mousemove', (e) => {
            rotateElement({ event: e, element: rotated as HTMLElement });
        });

        // scroll handling
        const sections = [
            document.querySelector('.section1'),
            document.querySelector('.section2'),
        ]
        const prevScrollY = {current : 0}
        let currentSection = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY.current) {
                console.log('Scrolling down');
                currentSection = Math.min(currentSection + 1, sections.length - 1);
                sections[currentSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.log('Scrolling up');
                currentSection = Math.max(currentSection - 1, 0);
                sections[currentSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        

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
        <div className='flex flex-col'>
        {/* section 1 */}
        <div className="section1 w-full h-[98vh] bg-nighttime animate-backgroundMove">
            <div className="flex items-center justify-center h-full md:w-1/5 w-4/5 m-auto">

                {/* change number in style of container div to change no. of elements in circle - other settings such as radius/space between elements are in globals.css */}
                {/* circle div (container) */}
                <div className="circle-container flex flex-col gap-1" style={{"--m": 6} as React.CSSProperties}>
                    {/* central element - properties of rotation can be changed above, styling in globals.css */}
                    <div id="rotate" className="flex flex-col items-center p-4 h-fit w-full bg-theme-background border-4 border-theme-border shadow shadow-black/50 animate-slideUpAndFade">
                        <p className="text-4xl pb-2">threesan</p>
                        {currentDescription ?
                            <div className='flex flex-col w-4/5'>
                                <img src={currentDescription.image} className='border-4 border-theme-border' />
                                <p className='text-4xl'>{currentDescription.title}</p>
                                <p className='text-sm'>Released: {currentDescription.releaseDate}</p>
                                <p>{currentDescription.description}</p>
                                <p className='text-xs'><br />{currentDescription.credits}</p>
                            </div>

                            : <p className="text-center">this is my website to display everything i've ever made ever.</p>
                        }
                    </div>

                    {/* elements in circle; 1-6 */}
                    <div style={{"--i": 1} as React.CSSProperties}>
                        <div className="md:block hidden animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
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
                        <div className="md:block hidden animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/icon_comingsoon.png" className="w-full h-full"/>
                        </div>
                    </div>

                </div>  
            </div>
            <p className='absolute bottom-0 w-full text-center text-theme-border text-sm'>© 2025, burgerbross Sp. z o.o. (not a real company)</p>
        </div>
        {/* section 2 */}
        <div className='section2 w-full h-screen bg-theme-background'>
            <div className='flex flex-col items-center justify-center w-3/5 h-full m-auto text-center gap-1'>
                <p className='text-4xl'>hiya :]</p>
                <p className='text-2xl'>this section is currently under development. i just made this cool scroll feature but don't have the time to learn how to make a beta branch for my github repo.
                    if anyone sees this, then now you know!
                </p>
            </div>
        </div>
        </div>
      
    );
  }