import { TechLabel } from "@/components/TechnologyLabel";
import { FC } from "react"
import Image from 'next/image';
import WPIEducationCard from "@/components/WPIEducationCard";

const Route: FC = () => {
    return(
        <div>
            <div className="flex justify-center items-center flex-col md:flex-row mx-10 md:mx-30 gap-2 md:gap-8">
                <img src="/images/cole.png" alt="Cole Image" className="my-6 md:my-10 w-75 rounded-2xl border-4 border-cyan"/>
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
                    <img src="/images/skills/unrealenginelogo.png" alt="UE Logo" className="mb-4 w-[25%]"/>
                    <img src="/images/skills/unitylogo.svg" alt="Unity Logo" className="mb-4 w-[25%]"/>
                    <img src="/images/skills/reactlogo.svg" alt="React Logo" className="mb-4 w-[25%]"/>
                </div>
                <div className="flex justify-center items-center flex-col md:flex-row gap-8">
                    <div className="flex flex-row gap-12 w-fit justify-center md:justify-end">
                        <img src="/images/skills/clogo.png" alt="C Logo" className="mb-4 w-[5%]"/>
                        <img src="/images/skills/c++logo.png" alt="C++ Logo" className="mb-4 w-[5%]"/>
                        <img src="/images/skills/csharplogo.png" alt="C# Logo" className="mb-4 w-[5%]"/>
                        <img src="/images/skills/javalogo.png" alt="Java Logo" className="mb-4 w-[10%]"/>
                        <img src="/images/skills/pythonlogo.png" alt="python Logo" className="mb-4 w-[5%]"/>
                    </div>
                    <div className="flex flex-row gap-12 w-fit justify-center md:justify-start">
                        <img src="/images/skills/typescriptlogo.png" alt="TypeScript Logo" className="mb-4 w-[5%]"/>
                        <img src="/images/skills/javascriptlogo.jpg" alt="JavaScript Logo" className="mb-4 w-[5%] rounded-md"/>
                        <img src="/images/skills/racketlogo.png" alt="Racket Logo" className="mb-4 w-[5%]"/>
                        <img src="/images/skills/latexlogo.png" alt="LaTex Logo" className="mb-4 w-[10%]"/>
                    </div>
                </div>
                <h2 className="text-xl font-medium mt-3 mb-3">Other Technologies</h2>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:items-end md:justify-end">
                    <TechLabel title="Git"/>
                    <TechLabel title="Next.js"/>
                    <TechLabel title="Node.js"/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:items-start">
                    <TechLabel title="Express"/>
                    <TechLabel title="SQL"/>
                    <TechLabel title="Linux"/>
                    </div>
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
                    <div className="shadow-lg w-[85%] md:w-150 h-fit border-2 rounded-xl border-tangerine/30 p-4 bg-lightgray">
                        <div className="flex items-start">
                            <img src="/images/blacki.png" alt="Black-I Logo" className="w-20 mt-2 mb-4 mr-4"/>
                            <div>
                                <h2 className="text-md md:text-xl font-semibold text-gray">Black-I Robotics</h2>
                                <h3 className="text-sm md:text-lg font-semibold text-gray/90">Software Engineer Intern</h3>
                                <h4 className="text-gray/50 text-sm mb-4">June - August 2025 | Boston, MA</h4>
                            </div>
                        </div>
                            
                            <p className="mb-4 text-sm md:text-[16px]"> 
                                • Worked in a fast-paced environment to develop a dashboard to track the status and location of robots<br/>
                                • Revamped the control panel for Black-I's robotic arms<br/>
                                • Implemented data tracking with MongoDB Atlas and added logging for errors and activity
                            </p>
                    </div>
                    <div className="shadow-lg w-[85%] md:w-150 h-fit border-2 rounded-xl border-tangerine/30 p-4 bg-lightgray mt-8">
                        <div className="flex items-start">
                            <img src="/images/indiecadelogo.png" alt="IndieCade Logo" className="w-20 mt-2 mb-4 mr-4"/>
                            <div>
                                <h2 className="text-md md:text-xl font-semibold text-gray">IndieCade</h2>
                                <h3 className="text-sm md:text-lg font-semibold text-gray/90">Game Design Intern</h3>
                                <h4 className="text-gray/50 text-sm mb-4">June - July 2024 | Remote</h4>
                            </div>
                        </div>
                            
                            <p className="mb-4 text-sm md:text-[16px]"> 
                                • Worked with a group of 8 as a programmer to create Daydreams of Change in Unreal Engine 5
                                for IndieCade’s Climate Jam 2024<br/>
                                • Playtested and reviewed other jam submissions regularly
                            </p>
                    </div>
                    <div className="shadow-lg w-[85%] md:w-150 h-fit border-2 rounded-xl border-tangerine/30 bg-lightgray p-4 mt-8">
                        <div className="flex items-start">
                            <div><img src="/images/brueggerslogo.svg" alt="IndieCade Logo" className="w-20 mt-2 mb-4 mr-8"/></div>
                            <div>
                                <h2 className="text-md md:text-xl font-semibold text-gray">Bruegger's Bagels & Jamba Juice</h2>
                                <h3 className="text-sm md:text-lg font-semibold text-gray/90">Team Member</h3>
                                <h4 className="text-gray/50 text-sm mb-4">July - September 2021 | Bedford, MA</h4>
                            </div>
                        </div>
                        <p className="mb-4 text-sm md:text-[16px]"> 
                            • Worked on the line with my coworkers to create smoothies and bagel sandwiches<br/>
                            • Resolved and handled customer interactions, inquiries, and issues<br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Route;