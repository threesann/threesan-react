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
        <div className="section h-[96vh] w-full bg-nighttime animate-backgroundMove">
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
        <div className='section w-full h-screen bg-black'>
            <div className='flex flex-col h-full w-full'>
                <div className='flex flex-row gap-5 items-center justify-center text-center h-2/5 w-full banner-style'>
                    <div className='bg-white h-[2px] w-1/3' />
                    <p className='text-6xl'>other stuff</p>
                    <div className='bg-white h-[2px] w-1/3' />
                </div>
                <div className='flex flex-col gap-2 justify-center text-center'>
                    <p className='text-4xl'>hiya.<br />sorry. there's no 'other stuff'.</p>
                    <p className='text-2xl'>in the future, this'll be a section for miscellaneous things that i make for good and fun.<br />of the world. the entire of it.</p>
                    <p className='text-xl'>i made this really cool full-page scroll feature, and needed to have other sections to show for it...<br />now i just have this section with nothing in it yet......<br /><br />i'm sorry if i got your expectations up from reading the title.....</p>
                    <p className='text-md text-gray-500'><br />i'm sorry.... for getting your hopes up for the other stuff....<br /><br /></p>
                    <p className='text-sm text-gray-500'>forgive me......................</p>
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