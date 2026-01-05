"use client";
import { Mail, Linkedin, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
    const [visible, setVisible] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        }, {threshold: 0.1});

        if(windowRef.current) {
            observer.observe(windowRef.current);
        }

        return () => {
            if(windowRef.current){
                observer.unobserve(windowRef.current);
            }
        }
    }, [])
    return (
        <div style={{boxShadow: "0px -4px 4px #999"}}
        className="w-full flex flex-col justify-center items-center bg-gray backdrop-blur-md py-6">
            <h1 className="pt-2 mb-3 text-cyan">Contact</h1>
            <hr className="border-tangerine border-3 mb-4 w-60 rounded-2xl mx-auto"/>
            <p className="text-xl mb-8 text-silver">Want to get in touch with me?</p>
            <div ref={windowRef} 
                className={`flex gap-8 w-full justify-center items-center mb-6 transition-all duration-500 
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}>
                <button 
                onClick={() => {window.location.href = 'mailto:nmbennett@wpi.edu'}}
                className="hover:scale-110 hover:cursor-pointer text-cyan hover:text-tangerine">
                    <Mail className="w-10 scale-200"/>
                </button>

                <button 
                onClick={() => {window.location.href = 'https://www.linkedin.com/in/nicholascolebennett'}}
                className="hover:scale-110 hover:cursor-pointer text-cyan hover:text-tangerine">
                    <Linkedin className="w-10 scale-200"/>
                </button>

                <button 
                onClick={() => {window.location.href = 'https://github.com/Boommook'}}
                className="hover:scale-110 hover:cursor-pointer text-cyan hover:text-tangerine">
                    <Github className="w-10 scale-200"/>
                </button>
            </div>
        </div>
    );
}