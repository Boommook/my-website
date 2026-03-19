"use client";
import { AssignmentEnlarged } from "./AssignmentEnlarged";
import { useState } from "react";

export type AssignmentCardProps = {

    title: string;
    description: string;
    link: string;
    date: string;
    image: string;
    enlarged: typeof AssignmentEnlarged;
}
export const AssignmentCard = ({ title, description, link, date, image }: AssignmentCardProps) => {

    const [clicked, setClicked] = useState(false);

    return (
        <div onClick={() => setClicked(!clicked)} className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray shadow-md shadow-gray-600 transition-transform hover:scale-105 hover:shadow-lg">
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray/30 sm:h-56 lg:h-64 ">
                <img
                src={image}
                alt={title}
                className="relative h-full w-full object-cover rounded-t-2xl"
                onClick={(e) => {
                    e.stopPropagation();
                    setClicked(!clicked);
                }}
                />
            </div>
            <div className="w-full rounded-b-xl border-t-2 border-tangerine bg-gradient-to-r from-gray/85 via-gray to-gray/85 p-2">
                <h2 className="justify-center py-2 pb-2 text-center text-2xl font-semibold text-silver">
                {title}
                </h2>
            </div>
        </div>
    )
}