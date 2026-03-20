"use client";
import { AssignmentEnlarged } from "./AssignmentEnlarged";
import { useState } from "react";

export type AssignmentCardProps = {

    title: string;
    documentation: string;
    code: string;
    video: string;
    date: string;
    image: string;
}
export const AssignmentCard = ({ title, documentation, code, video, date, image }: AssignmentCardProps) => {

    return (
        <div className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-gray shadow-md shadow-gray-600">
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray/30 sm:h-56 lg:h-64 ">
                <img
                src={image}
                alt={title}
                className="relative h-full w-full object-cover rounded-t-2xl"
                />
            </div>
            <div className="w-full rounded-b-xl border-t-2 border-tangerine bg-gradient-to-r from-gray/85 via-gray to-gray/85 p-2
            flex flex-col items-center justify-center pb-3">
                <h2 className="justify-center py-2 pb-2 text-center text-2xl font-semibold text-silver">
                {title}
                </h2>
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <div className="flex flex-row items-center justify-center gap-x-4">
                        <button onClick={() => window.open(documentation, '_blank')} className="text-silver bg-tangerine px-2 py-1 hover:scale-105 shadow-md hover:bg-tangerine-700 rounded-xl hover:cursor-pointer">Docs</button>
                    </div>
                    <button onClick={() => window.open(code, '_blank')} className="text-silver bg-cyan px-2 py-1 hover:scale-105 shadow-md hover:bg-cyan-700 rounded-xl hover:cursor-pointer">Code</button>
                </div>
                </div>
        </div>
    )
}