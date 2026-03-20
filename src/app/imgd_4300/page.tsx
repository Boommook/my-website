"use client";
import { FC, useState, useEffect } from "react";
import { Assignments } from "@/components/imgd_4300/Assignments";
import { AssignmentCard } from "@/components/imgd_4300/AssignmentCard";

const Route: FC = () => {
    const [mx, setMx] = useState<string>("4vw")
    useEffect(() => {
        const documentWidth = typeof document !== "undefined" ? document.documentElement.clientWidth : 1024
        setMx(documentWidth < 2000 ? documentWidth < 1000 ? "2vw" : "4vw" : "20vw")
    }, [])

    return(
        <div className="flex flex-col mb-4 items-center justify-center">
            <div className="flex items-center justify-center gap-x-2 mt-6 mb-4 flex flex-col gap-y-2">
                <h1 className=" text-gray items-center justify-center">Computer Graphics, Aesthetics, and Simulation</h1>
                <h3 className=" text-gray/80 items-center justify-center text-center mx-40 lg:mx-50 md:mx-60 sm:mx-0">This page was created for my CS/IMGD 4300 course at WPI, with the above title, taught by Professor Charlie Roberts
                    . The purpose is to track my progress in the course and showcase the projects I have worked on.</h3>
            </div>
            <div className="m-4 flex justify-center items-center">
                <div className="w-full flex-1 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" style={{ marginLeft: mx, marginRight: mx }}>
                    {Object.keys(Assignments).map((assignment) => (
                        <AssignmentCard key={assignment} title={Assignments[assignment].title} documentation={Assignments[assignment].documentation} code={Assignments[assignment].code} video={Assignments[assignment].video} date={Assignments[assignment].date} image={Assignments[assignment].image} enlarged={Assignments[assignment].enlarged} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Route;