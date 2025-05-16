"use client";
import { Mail } from "lucide-react";
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
        <div className="w-full flex flex-col justify-center items-center bg-[#658265]/65 backdrop-blur-md py-6">
            <h1 className="pt-2 mb-3">Contact</h1>
            <hr className="border-black border-3 mb-4 w-60 rounded-2xl mx-auto"/>
            <p className="text-xl mb-4 !text-black">Want to get in touch with me?</p>
            <div ref={windowRef} 
                className={`flex gap-8 w-full justify-center items-center mb-6 transition-all duration-500 
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}>
                <button 
                onClick={() => {window.location.href = 'mailto:nmbennett@wpi.edu'}}
                className="hover:scale-110">
                    <Mail className="w-10 scale-200"/>
                </button>

                <a
                href="https://www.linkedin.com/in/nicholascolebennett"
                target="_blank"
                rel="noopener noreferrer"
                ><img src="/svg/linkedin.svg" alt="LinkedIn" className="contact-icon img-fluid grayscale w-10 hover:scale-110"></img></a>
                
                <a
                href="https://github.com/Boommook"
                target="_blank"
                rel="noopener noreferrer"
                ><img src="/svg/github.svg" alt="Github" className="w-10 contact-icon img-fluid grayscale hover:scale-110"></img></a>
                
            </div>
        </div>
    );
}