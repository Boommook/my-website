"use client"
import {ReactNode, useState} from "react";
import {SquareArrowOutUpRight} from "lucide-react"
import Image from 'next/image';

type ProjectProps = {
    image: string;
    title: string;
    labels: ReactNode[];
    description: string;
    link?: string
  };

export const Project = ({ image, title, labels, description, link}: ProjectProps) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className="flex justify-center flex-col items-center w-fit rounded-2xl hover:scale-105 shadow-lg cursor-pointer" 
        onClick={() => setFlipped(!flipped)}>
            {!flipped ?
            <img
            src={image}
            alt={title}
            className={"w-114 h-64 rounded-t-2xl"}
            onClick={() => setFlipped(!flipped)}
                        /> : <div onClick={() => setFlipped(!flipped)} className="w-114 h-64 rounded-t-2xl !bg-white/70 p-6">
                            {description}</div>}
            <div className="bg-[#ADAD8B]/50 p-2 w-full flex flex-col rounded-b-2xl border-2 border-[#ADAD8B]/50">
                <h2 className="text-2xl font-semibold py-2 pb-4 justfiy-center text-center">{title}</h2>

                <div className="flex justify-center">
                    {!flipped ? labels.map((label, index) => (
                    <div key={index}>{label}</div>
                )) :
                    <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer" className="w-fit px-2 bg-gray-100 rounded-md justify-center items-center
                     py-1 text-lg font-semibold mx-1.5 flex gap-2 hover:bg-[#D8EFF0]">
                        <SquareArrowOutUpRight className=" w-5"/> Project
                    </a>}
                </div>
            </div>
        </div>
    )
}
