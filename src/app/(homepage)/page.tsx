"use client";

import { useState, useEffect } from 'react';

import Descriptions from '@/lib/homepage/sitedescriptions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Home() {
    interface RotateElementParams {
        event: MouseEvent;
        element: HTMLElement;
    }

    const [showDesc, setShowDesc] = useState<string>("");
    const currentDescription = Descriptions.find(desc => desc.name === showDesc);

    const router = useRouter();

    

    useEffect(() => {
        const rotated = document.getElementById('rotate');
        document.addEventListener('mousemove', (e) => {
            rotateElement({ event: e, element: rotated as HTMLElement });
        });

        // scroll handling
        const sections: HTMLElement[] =  Array.from(document.querySelectorAll('.section')) as HTMLElement[]; // sections in code automatically added

        let currentSection = 0;
        let isScrolling = false;

        const handleScroll = (event: WheelEvent) => {
            if (isScrolling) return;

            isScrolling = true;
            const delta = event.deltaY;

            if (delta > 0) {
                console.log('scrolling down')
                currentSection = Math.min(currentSection + 1, sections.length - 1);
            } else {
                console.log('scrolling up')
                currentSection = Math.max(currentSection - 1, 0);
            }

            sections[currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // delay to prevent multiple scrolls
            setTimeout(() => {
                isScrolling = false;
            }, 390); // ran some tests; 390ms is the average time it takes scrollIntoView to scroll 100vh. it's a little janky, but it works, as they'll all be screen height
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
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
        <div className='w-full h-fit'>
        {/* section 1 */}
        <div className="section relative h-screen w-full bg-nighttime animate-backgroundMove">
            <div className="flex items-center justify-center h-full md:w-1/5 w-4/5 m-auto">

                {/* change number in style of container div to change no. of elements in circle - other settings such as radius/space between elements are in globals.css */}
                {/* circle div (container) */}
                <div className="circle-container flex flex-col gap-1" style={{"--m": 6} as React.CSSProperties}>
                    {/* central element - properties of rotation can be changed above, styling in globals.css */}
                    <div id="rotate" className="flex flex-col items-center p-4 h-fit w-full bg-theme-background border-4 border-theme-border shadow shadow-black/50 animate-fadeIn">
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
                    <p className='w-full text-center text-theme-border text-sm mt-1'>© 2025, burgerbross Sp. z o.o. (not a real company)</p>

                    {/* elements in circle; 1-6 */}
                    <div style={{"--i": 1} as React.CSSProperties}>
                        <div className="md:block hidden animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/homepage/icon_comingsoon.png" className="w-full h-full"/>
                        </div>
                    </div>

                    <div style={{"--i": 2} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://threesann.github.io/">
                                <img src="/homepage/icon_threesan.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("threesangithub")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 3} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://kevsterclicker.com">
                                <img src="/homepage/icon_chatitin.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("chatitin")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 4} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-pointer shadow shadow-black/50">
                            <a href="https://kevster.vercel.app">
                                <img src="/homepage/icon_kevsterclicker.png" className="w-full h-full"
                                    onMouseEnter={() => setShowDesc("kevsterclicker")} 
                                    onMouseLeave={() => setShowDesc("")}
                                />
                            </a>
                        </div>
                    </div>

                    <div style={{"--i": 5} as React.CSSProperties}>
                        <div className="animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/homepage/icon_nighttimeforest.png" className="w-full h-full"
                                onMouseEnter={() => setShowDesc("nighttimeforest")} 
                                onMouseLeave={() => setShowDesc("")}
                            />
                        </div>
                    </div>

                    <div style={{"--i": 6} as React.CSSProperties}>
                        <div className="md:block hidden animate-slideUpAndFadeAndBob bg-theme-background border-4 border-theme-border hover:border-white hover:cursor-not-allowed shadow shadow-black/50">
                            <img src="/homepage/icon_comingsoon.png" className="w-full h-full"/>
                        </div>
                    </div>

                </div>  
            </div>
            <div className='absolute bottom-1 h-fit w-full flex flex-row items-center justify-center gap-2 px-10 animate-slideUpAndFadeAndBob'>
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white" />
                <p className='text-center text-white text-2xl'>SCROLL DOWN</p>
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white" />
            </div>
        </div>
        {/* section 2 */}
        <div className='section w-full h-screen bg-black'>
            <div className='flex flex-col h-full w-full gap-2'>
                <div className='flex flex-row gap-5 items-center justify-center text-center h-1/5 w-full banner-style'>
                    <div className='bg-white h-[2px] md:w-1/3 w-1/4' />
                    <p className='md:text-5xl text-2xl'>other stuff</p>
                    <div className='bg-white h-[2px] md:w-1/3 w-1/4' />
                </div>
                
                <div className='flex md:flex-row flex-col md:w-3/5 w-4/5 md:h-3/5 h-full m-auto md:gap-3 gap-2'>
                    <div className='flex flex-col gap-2 p-2 border-double border-4 border-white w-full md:h-full h-2/5'>
                        <div className='w-full h-fit'>
                            <p className='md:text-5xl text-2xl'>SIDE-PROJECTS</p>
                        </div>
                        <div 
                            className='flex flex-row gap-2 p-1 items-start justify-start w-full hover:bg-white/10 hover:cursor-pointer'
                            onClick={() => router.push("/soundboard")}
                        >
                            <img src="/homepage/kevster_soundboard.png" className='size-14' />
                            <div className='flex flex-col items-start justify-start text-left w-full'>
                                <p className='text-2xl leading-tight'>Kevster Soundboard</p>
                                <p className='text-sm text-white/80 leading-tight'>Mess around with all of your favourite Kevster sounds and songs!</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:h-full h-3/5 gap-2 w-full'>
                        <div className='flex flex-col border-double border-4 border-white h-4/5 p-2'>
                            <div className='w-full h-fit'>
                                <p className='md:text-5xl text-2xl'>NEWS???</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 border-double border-4 border-white h-1/5'>
                            <div className='flex w-full h-full items-center justify-center'>
                                <p className='text-white/50'>hahaha... im the mysterious unknown box</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/5 flex items-center justify-center px-2'>
                    <Link href='https://deepest.vercel.app'>
                        <img src='/homepage/ad.gif'></img>
                    </Link>
                </div>
            </div>
        </div>
        <div className='section w-full h-screen bg-theme-background'>
            <div className='flex flex-col items-center justify-center w-3/5 h-full m-auto text-center gap-1'>
                <p className='text-4xl'>SURPRISE! section 3 :O</p>
            </div>
        </div>
        </div>
      
    );
  }