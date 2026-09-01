"use client";
import { Mail, Github, Linkedin } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import FooterHexagonBG from "./FooterHexagonBG";

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

        return () => observer.disconnect();
    }, [])
    return (
        <footer style={{boxShadow: "0px -4px 4px #999"}}
        className="relative bottom-0 w-full shrink-0 z-50 flex flex-col justify-center items-center bg-gray backdrop-blur-md py-6 overflow-hidden">
            <FooterHexagonBG />
            <div className="flex flex-col justify-center items-center gap-1">
                <h1 className="pt-2 text-cyan">Contact</h1>
                <hr className="border-tangerine border-3 mb-4 w-full rounded-2xl mx-auto"/>
            </div>
            
            <p className="text-xl mb-8 text-silver">Want to get in touch with me?</p>
            <div ref={windowRef} 
                className={`flex gap-8 w-full justify-center items-center mb-6 transition-all duration-500 
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}>
                <a href="mailto:nmbennett@wpi.edu" aria-label="Email Cole Bennett"
                className="text-cyan transition-transform hover:scale-110 hover:text-tangerine focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-tangerine">
                    <Mail className="w-10 scale-200"/>
                </a>

                <a href="https://www.linkedin.com/in/nicholascolebennett" target="_blank" rel="noopener noreferrer" aria-label="Cole Bennett on LinkedIn"
                className="text-cyan transition-transform hover:scale-110 hover:text-tangerine focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-tangerine">
                    <Linkedin className="w-10 scale-200"/>
                </a>

                <a href="https://github.com/Boommook" target="_blank" rel="noopener noreferrer" aria-label="Cole Bennett on GitHub"
                className="text-cyan transition-transform hover:scale-110 hover:text-tangerine focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-tangerine">
                    <Github className="w-10 scale-200"/>
                </a>
            </div>
        </footer>
    );
}
