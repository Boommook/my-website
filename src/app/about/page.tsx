"use client"
import { TechLabel } from "@/components/TechnologyLabel";
import { FC, useLayoutEffect, useRef, useState } from "react"
import Image from 'next/image';
import WPIEducationCard from "@/components/WPIEducationCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { OtherTechLabels } from "@/components/OtherTechLabels";

const Route: FC = () => {
    return(
        <div>
            <div className="flex justify-center items-center flex-col md:flex-row mx-10 md:mx-30 gap-2 md:gap-8">
                <img src="/images/cole_portrait.jpg" alt="Cole Image" className="my-6 md:my-10 w-75 rounded-2xl border-4 border-cyan"/>
                <p className="mb-4 md:mb-0">Hello! I am Nicholas "Cole" Bennett!<br/><br/>

                I am a student at Worcester Polytechnic Insitute studying Computer Science and Interactive Media and Game Design. My dream is to work in the game development industry utilizing both of my majors.
                <br/><br/>
                This past summer, I interned at Black-I Robotics, a robotics start-up, as a Software Engineering Intern. 
                In this role, I used React and Websockets to create a robot fleet dashboard that tracks the status and location of Black-I's robotic arms.
                The dashboard features authorization control for administrators. 
                I utilized MongoDB Atlas to track activity, errors, and other such data from not only the dashboard, but also the robotic arm control panels.
                <br/><br/>
                I have created this website as an online portfolio to showcase my projects and share important details about me for potential employers. If you are interested in further details regarding my work experience and academics, I suggest you take a look at my resume!
                <br/><br/>
                In my free time I enjoy playing ultimate frisbee, playing and creating videogames, brewing mead, rock climbing, hiking, and much more!
                <br/><br/>
                If you have any further questions, feel free to reach out!</p>
            </div>
            <div className="flex flex-col justify-center items-center !bg-gray/5 py-4 pb-8">

                <h1 className="mt-6 mb-4 text-gray">My Skills</h1>
                <hr className="border-cyan border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                <div className="flex justify-center items-center gap-4 mb-2 md:gap-8">
                    <img src="/images/skills/unrealenginelogo.png" alt="UE Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://www.unrealengine.com/en-US", "_blank")}/>
                    <img src="/images/skills/unitylogo.svg" alt="Unity Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://unity.com/", "_blank")}/>
                    <img src="/images/skills/reactlogo.svg" alt="React Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://react.dev/", "_blank")}/>
                </div>
                <div className="flex justify-center items-center flex-col md:flex-row gap-8">
                    <div className="flex flex-row gap-12 w-fit justify-center md:justify-end">
                        <img src="/images/skills/clogo.png" alt="C Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://en.wikipedia.org/wiki/C_(programming_language)", "_blank")}/>
                        <img src="/images/skills/c++logo.png" alt="C++ Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://en.wikipedia.org/wiki/C%2B%2B", "_blank")}/>
                        <img src="/images/skills/csharplogo.png" alt="C# Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://en.wikipedia.org/wiki/C_Sharp_(programming_language)", "_blank")}/>
                        <img src="/images/skills/javalogo.png" alt="Java Logo" className="mb-4 w-[10%] hover:cursor-pointer" onClick={() => window.open("https://www.java.com/en/", "_blank")}/>
                        <img src="/images/skills/pythonlogo.png" alt="python Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://www.python.org/", "_blank")}/>
                    </div>
                    <div className="flex flex-row gap-12 w-fit justify-center md:justify-start">
                        <img src="/images/skills/typescriptlogo.png" alt="TypeScript Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://www.typescriptlang.org/", "_blank")}/>
                        <img src="/images/skills/javascriptlogo.jpg" alt="JavaScript Logo" className="mb-4 w-[5%] rounded-md hover:cursor-pointer" onClick={() => window.open("https://www.javascript.com/", "_blank")}/>
                        <img src="/images/skills/racketlogo.png" alt="Racket Logo" className="mb-4 w-[5%] hover:cursor-pointer" onClick={() => window.open("https://racket-lang.org/", "_blank")}/>
                        <img src="/images/skills/latexlogo.png" alt="LaTex Logo" className="mb-4 w-[10%] hover:cursor-pointer" onClick={() => window.open("https://www.latex-project.org/", "_blank")}/>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mt-3 mb-2">Other Technologies</h2>
                <hr className="border-cyan border-3 mb-5 w-60 rounded-2xl mx-auto"/>
                <OtherTechLabels />
            </div>
            <div className="flex justify-center flex-col md:flex-row py-4 gap-[6%] mb-8">
                <div className="flex flex-col justify-start items-center">
                    <h1 className="mt-6 mb-4 text-gray">Education</h1>
                    <hr className="border-cyan border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                    <WPIEducationCard />
                </div>
                <div className="flex flex-col justify-start items-center">
                    <h1 className="mt-6 mb-4 text-gray">Experience</h1>
                    <hr className="border-cyan border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                    <div className="flex flex-col justify-center items-center gap-4">
                    <ExperienceCard
                        company="Black-I Robotics"
                        position="Software Engineer Intern"
                        location="Boston, MA"
                        duration="June - August 2025"
                        responsibilities={["Worked in a fast-paced environment to develop a dashboard to track the status and location of robots", "Revamped the control panel for Black-I's robotic arms", "Implemented data tracking with MongoDB Atlas and added logging for errors and activity"]}
                        image="/images/blacki.png"
                        link="https://www.blackirobotics.com/"
                    />
                    <ExperienceCard
                        company="IndieCade"
                        position="Game Design Intern"
                        location="Remote"
                        duration="June - July 2024"
                        responsibilities={["Worked with a group of 8 as a programmer to create Daydreams of Change in Unreal Engine 5 for IndieCade's Climate Jam 2024", "Playtested and reviewed other jam submissions regularly"]}
                        image="/images/indiecadelogo.png"
                        link="https://www.indiecade.com/"
                    />
                    <ExperienceCard
                        company="Bruegger's Bagels & Jamba Juice"
                        position="Team Member"
                        location="Bedford, MA"
                        duration="July - September 2021"
                        responsibilities={["Worked on the line with my coworkers to create smoothies and bagel sandwiches", "Resolved and handled customer interactions, inquiries, and issues"]}
                        image="/images/brueggerslogo.svg"
                        link="https://www.brueggers.com/"
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Route;