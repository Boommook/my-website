"use client"
import {ReactNode, useState} from "react";
import {SquareArrowOutUpRight} from "lucide-react"
import Image from 'next/image';

type ProjectProps = {
    image: string;
    title: string;
    labels: ReactNode[];
    description: string;
    filters: string[];
    link?: string
  };

export const Project = ({ image, title, labels, description, filters, link}: ProjectProps) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className="flex justify-center flex-col items-center w-fit rounded-2xl hover:scale-105
         hover:shadow-lg shadow-gray-600 cursor-pointer shadow-md border-2 border-gray"
        onClick={() => setFlipped(!flipped)}>
            {!flipped ?
            <img
            src={image}
            alt={title}
            className={"w-114 h-64 rounded-t-2xl"}
            onClick={() => setFlipped(!flipped)}
                        /> : <div onClick={() => setFlipped(!flipped)} className="w-114 h-64 text start rounded-t-xl !bg-silver/80 p-6 text-gray pt-3">
                            {description.split('\n').map((line, index) => (
                                <div key={index}>
                                    {index > 0 && <hr className="border-gray/30 my-2" />}
                                    <p className="mb-0">{line}</p>
                                </div>
                            ))}</div>}
            <div className=" p-2 w-full flex flex-col rounded-b-xl border-t-2 border-tangerine
            bg-gradient-to-r from-gray/85 via-gray to-gray/85">
                <h2 className="text-2xl font-semibold py-2 pb-2 justfiy-center text-center text-silver">{title}</h2>

                <div className="flex justify-center">
                    {!flipped ? 
                        labels.map((label, index) => (
                            <div key={index}>{label}</div>
                        )) :
                        <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer" className="w-fit px-2 bg-cyan rounded-md flex justify-center items-center
                        py-1 text-lg font-semibold mx-1.5 gap-2 hover:bg-tangerine text-silver transition-colors">
                            <SquareArrowOutUpRight className=" w-5 text-gray"/> 
                            <p className="text-silver text-center flex justify-center items-center mb-0.5">Project</p>
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}
