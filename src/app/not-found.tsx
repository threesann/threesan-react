"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-screen w-3/5 mx-auto">
            <div className="flex flex-row gap-2 justify-between items-center w-full h-fit">
                <img
                    src="/404notfound/404d2_larger.png"
                    className="flex-shrink-0"
                />
                <div className="flex flex-col gap-3 justify-start items-start w-fit">
                    <h1 className="text-8xl bolder italic">Oops!</h1>
                    <p className="text-lg leading-tight">
                        Looks like your mouse has dragged you somewhere you're
                        not supposed to be. What a mysterious place...<br/><br/> You can{" "}
                        <button
                            onClick={() => router.back()}
                            className="text-white underline bg-transparent border-none cursor-pointer"
                        >
                            GO BACK
                        </button>{" "}
                        to the previous page, or{" "}
                        <a href="mailto:snookerinc51@gmail.com" className="underline">
                            REPORT
                        </a>{" "}
                        this issue here.
                    </p>
                </div>
            </div>
        </div>
    );
}
