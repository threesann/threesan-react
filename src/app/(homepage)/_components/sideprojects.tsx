"use client";

import Sideprojects from "@/lib/homepage/sideprojects";
import { useRouter } from "next/navigation";

export default function SideProjects() {

    const router = useRouter();

    return (
        Sideprojects.map((project, index) => (
            <div
                key={index}
                className="flex flex-row gap-2 p-1 items-start justify-start w-full hover:bg-white/10 hover:cursor-pointer"
                onClick={() => router.push(project.link)}
            >
                <img src={project.image} className="size-14" />
                <div className="flex flex-col items-start justify-start text-left w-full">
                    <p className="md:text-2xl text-xl leading-tight">{project.title}</p>
                    <p className="text-sm text-white/80 leading-tight">
                        {project.description}
                    </p>
                </div>
            </div>
        ))
    );
}
