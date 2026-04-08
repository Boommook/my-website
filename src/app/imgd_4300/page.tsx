"use client";
import { FC, useState, useEffect } from "react";
import { Assignments } from "@/components/imgd_4300/Assignments";
import { AssignmentCard } from "@/components/imgd_4300/AssignmentCard";
import { AssignmentDocs } from "@/components/imgd_4300/AssignmentDocs";
const Route: FC = () => {
    const [mx, setMx] = useState<string>("4vw")
    const [openDocTitle, setOpenDocTitle] = useState<string | null>(null);
    const [openDocDate, setOpenDocDate] = useState<string | null>(null);
    const [openDocText, setOpenDocText] = useState<string>("");
    const [isDocLoading, setIsDocLoading] = useState<boolean>(false);

    useEffect(() => {
        const documentWidth = typeof document !== "undefined" ? document.documentElement.clientWidth : 1024
        setMx(documentWidth < 2000 ? documentWidth < 1000 ? "2vw" : "4vw" : "20vw")
    }, [])

    useEffect(() => {
        if (!openDocTitle) return;
        const onEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpenDocTitle(null);
            }
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [openDocTitle]);

    const openDocumentation = async (title: string, date: string, documentationPath: string) => {
        setOpenDocTitle(title);
        setOpenDocDate(date);
        setIsDocLoading(true);
        try {
            const response = await fetch(documentationPath);
            if (!response.ok) {
                throw new Error(`Failed to load docs (${response.status})`);
            }
            const text = await response.text();
            setOpenDocText(text);
        } catch {
            setOpenDocText("Unable to load documentation right now.");
        } finally {
            setIsDocLoading(false);
        }
    };

    const closeDocumentation = () => {
        setOpenDocTitle(null);
        setOpenDocDate(null);
    };

    return(
        <div className="flex flex-col mb-4 items-center justify-center">
            <div className="mt-6 mb-4 flex flex-col items-center justify-center gap-x-2 gap-y-2">
                <h1 className=" text-gray items-center justify-center">Computer Graphics, Aesthetics, and Simulation</h1>
                <h3 className=" text-gray/80 items-center justify-center text-center mx-40 lg:mx-50 md:mx-60 sm:mx-0">This page was created for my CS/IMGD 4300 course at WPI, with the above title, taught by Professor Charlie Roberts. The purpose is to track my progress in the course and showcase the projects I have worked on.</h3>
            </div>
            <div className="m-4 flex justify-center items-center">
                <div className="w-full flex-1 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" style={{ marginLeft: mx, marginRight: mx }}>
                    {Object.keys(Assignments).map((assignment) => (
                        <AssignmentCard key={assignment} title={Assignments[assignment].title} documentation={Assignments[assignment].documentation} demo={Assignments[assignment].demo} code={Assignments[assignment].code} video={Assignments[assignment].video} date={Assignments[assignment].date} image={Assignments[assignment].image} onOpenDocumentation={openDocumentation} />
                    ))}
                </div>
            </div>
            {openDocTitle && (
                <AssignmentDocs openDocTitle={openDocTitle} openDocDate={openDocDate} openDocText={openDocText} isDocLoading={isDocLoading} closeDocumentation={closeDocumentation} />
            )}
        </div>
    )
}

export default Route;