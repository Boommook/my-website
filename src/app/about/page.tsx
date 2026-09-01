"use client"
import { TechLabel } from "@/components/TechnologyLabel";
import { FC, useLayoutEffect, useRef, useState } from "react"
import Image from 'next/image';
import WPIEducationCard from "@/components/WPIEducationCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { OtherTechLabels } from "@/components/OtherTechLabels";
import { SkillLogo } from "@/components/SkillLogo";
import { RevealText } from "@/components/RevealText";
import { withBasePath } from "@/lib/paths";

const Route: FC = () => {
    return(
        <div>
            <div className="flex justify-center items-center flex-col md:flex-row mx-10 md:mx-30 gap-2 md:gap-8">
                <img src={withBasePath("/images/cole_portrait.jpg")} alt="Cole Image" className="my-6 md:my-10 w-75 rounded-2xl border-4 border-cyan"/>
                <RevealText className="mb-4 md:mb-0 w-full min-w-0 text-dark-turquoise" delay={0.15}>
                  Hello! I am Nicholas &quot;Cole&quot; Bennett!
                  <br /><br />
                  I am a student at Worcester Polytechnic Insitute studying Computer Science and Interactive Media and Game Design. My dream is to work in the game development industry utilizing both of my majors.
                  <br /><br />
                  Last summer, I interned at NeuroSync, a neurotech startup, as a Web Design Associate.
                  In this role, I developed responsive websites for NeuroSync and the Every Great Reason Foundation, while working closely with the CEO to implement his visions for the websites.
                  <br /><br />
                  I have created this website as an online portfolio to showcase my projects and share important details about me for potential employers. If you are interested in further details regarding my work experience and academics, I suggest you take a look at my resume!
                  <br /><br />
                  In my free time I enjoy playing ultimate frisbee, playing and creating videogames, brewing mead, working out, and more.
                  <br /><br />
                  If you have any further questions, feel free to reach out!
                </RevealText>
            </div>
            <div className="flex flex-col justify-center items-center !bg-gray/5 gap-4 py-4 pb-8 ">

                <div className="flex flex-col justify-center items-center gap-4 mt-4">
                    <div className="flex flex-col justify-center items-center w-fit gap-1">
                        <h1 className="text-4xl font-semibold text-gray">My Skills</h1>
                        <hr className="border-cyan border-3 w-full rounded-2xl mx-auto"/>
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-2 md:gap-8">
                        <img src={withBasePath("/images/skills/unrealenginelogo.png")} alt="UE Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://www.unrealengine.com/en-US", "_blank")}/>
                        <img src={withBasePath("/images/skills/unitylogo.svg")} alt="Unity Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://unity.com/", "_blank")}/>
                        <img src={withBasePath("/images/skills/reactlogo.svg")} alt="React Logo" className="mb-4 w-[25%] hover:cursor-pointer" onClick={() => window.open("https://react.dev/", "_blank")}/>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-center items-center w-fit gap-1">
                        <h1 className="text-2xl font-semibold">Programming Languages</h1>
                        <hr className="border-cyan border-3 w-full rounded-2xl mx-auto"/>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10 px-4 max-w-3xl">
                            <SkillLogo src={withBasePath("/images/skills/clogo.png")} alt="C" onClick={() => window.open("https://en.wikipedia.org/wiki/C_(programming_language)", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/c++logo.png")} alt="C++" onClick={() => window.open("https://en.wikipedia.org/wiki/C%2B%2B", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/csharplogo.png")} alt="C#" onClick={() => window.open("https://en.wikipedia.org/wiki/C_Sharp_(programming_language)", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/javalogo.png")} alt="Java" large onClick={() => window.open("https://www.java.com/en/", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/pythonlogo.png")} alt="python" onClick={() => window.open("https://www.python.org/", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/typescriptlogo.png")} alt="TypeScript" onClick={() => window.open("https://www.typescriptlang.org/", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/javascriptlogo.jpg")} alt="JavaScript" onClick={() => window.open("https://www.javascript.com/", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/racketlogo.png")} alt="Racket" onClick={() => window.open("https://racket-lang.org/", "_blank")}/>
                            <SkillLogo src={withBasePath("/images/skills/latexlogo.png")} alt="LaTex" large onClick={() => window.open("https://www.latex-project.org/", "_blank")}/>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-center items-center w-fit gap-1">
                        <h1 className="text-2xl font-semibold">Other Technologies</h1>
                        <hr className="border-cyan border-3 w-full rounded-2xl mx-auto"/>
                    </div>
                    <OtherTechLabels />
                </div>

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
                        company="NeuroSync | Every Great Reason"
                        position="Web Design Associate"
                        location="Holliston, MA"
                        duration="July - August 2026"
                        responsibilities={["Developed responsive websites for NeuroSync and the Every Great Reason Foundation","Worked hand-in-hand with the CEO to implement his vision for the foundation's website", "Built custom HTML, CSS, and JavaScript components to improve usability and visual design"]}
                        image="/images/egr.jpg"
                        link="https://everygreatreason.org/"
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