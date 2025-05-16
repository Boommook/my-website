import { TechLabel } from "@/components/TechnologyLabel";
import { FC } from "react"
import Image from 'next/image';

const Route: FC = () => {
    return(
        <div>
            <div className="flex justify-center items-center mx-70 gap-8">
                <Image src="/images/cole.png" alt="Cole Image" className="my-10 w-75 rounded-2xl border-4 border-[#3F5757]"/>
                <p>Hello! I am Nicholas "Cole" Bennett!<br/><br/>

                I am a student at Worcester Polytechnic Insitute studying Computer Science and Interactive Media and Game Design. My dream is to work in the game development industry utilizing both of my majors.
                <br/><br/>
                I have created this website as an online portfolio to showcase my projects and share important details about me for potential employers. If you are interested in further details regarding my work experience and academics, I suggest you take a look at my resume!
                <br/><br/>
                In my free time I enjoy playing ultimate frisbee, playing and creating videogames, brewing mead, rock climbing, hiking, and much more!
                <br/><br/>
                If you have any further questions, feel free to reach out!</p>
            </div>
            <div className="flex flex-col justify-center items-center !bg-[#ada38b]/10 py-4 pb-8">

                <h1 className="mt-6 mb-4 text-[#292833]">My Skills</h1>
                <hr className="border-black border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                <div className="flex justify-center items-center gap-16 mb-2">
                    <Image src="/images/skills/unrealenginelogo.png" alt="UE Logo" className="mb-4 w-75"/>
                    <Image src="/images/skills/unitylogo.svg" alt="Unity Logo" className="mb-4 w-75"/>
                    <Image src="/images/skills/reactlogo.svg" alt="React Logo" className="mb-4 w-75"/>
                </div>
                <div className="flex justify-center items-center gap-12">
                    <Image src="/images/skills/clogo.png" alt="C Logo" className="mb-4 w-15"/>
                    <Image src="/images/skills/c++logo.png" alt="C++ Logo" className="mb-4 w-15"/>
                    <Image src="/images/skills/csharplogo.png" alt="C# Logo" className="mb-4 w-15"/>
                    <Image src="/images/skills/javalogo.png" alt="Java Logo" className="mb-4 w-25"/>
                    <Image src="/images/skills/typescriptlogo.png" alt="TypeScript Logo" className="mb-4 w-15"/>
                    <Image src="/images/skills/javascriptlogo.jpg" alt="JavaScript Logo" className="mb-4 w-15 rounded-md"/>
                    <Image src="/images/skills/racketlogo.png" alt="Racket Logo" className="mb-4 w-15"/>
                    <Image src="/images/skills/latexlogo.png" alt="LaTex Logo" className="mb-4 w-25"/>
                </div>
                <h2 className="text-xl font-medium mt-3 mb-3">Other Technologies</h2>
                <div className="flex justify-center items-center gap-4">
                    <TechLabel title="Git"/>
                    <TechLabel title="Next.js"/>
                    <TechLabel title="Node.js"/>
                    <TechLabel title="Express"/>
                    <TechLabel title="SQL"/>
                    <TechLabel title="Linux"/>
                </div>
            </div>
            <div className="flex justify-center py-4 gap-36 mb-8">
                <div>
                    <h1 className="mt-6 mb-4 text-dark-navy">Education</h1>
                    <hr className="border-black border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                    <div className="shadow-lg w-140 h-60 border-2 rounded-xl border-[#ADAD8B]/30 p-4 bg-white/80">
                        <h2 className="text-xl font-semibold">Worcester Polytechnic Institute</h2>
                        <h3 className="text-black/50 text-sm mb-4">BS, Computer Science and Interactive Media & Game Development</h3>
                        <p className="mb-4">GPA: 3.92/4.0</p>
                        <ul className="text-dark-turquoise">
                            • PR Chair, Ultimate Frisbee Men's Team<br/>
                            • Member, Upsilon Pi Epsilon the Computer Science Honors Society<br/>
                            • Member, Outing Club<br/>
                            • Member, IMGD Colloquiums
                            • Dean's List (all semesters)
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="mt-6 mb-4">Experience</h1>
                    <hr className="border-black border-3 mb-8 w-60 rounded-2xl mx-auto"/>
                    <div className="shadow-lg w-140 h-50 border-2 rounded-xl border-[#ADAD8B]/30 p-4 bg-white/80">
                        <div className="flex">
                            <img src="/images/indiecadelogo.png" alt="IndieCade Logo" className="w-20 my-4 mr-4"/>
                            <div>
                                <h2 className="text-2xl font-semibold">IndieCade</h2>
                                <h3 className="text-lg font-semibold">Game Design Intern</h3>
                                <h4 className="text-black/50 text-sm mb-4">June - July 2024 | Remote</h4>
                            </div>
                        </div>
                            
                            <p className="mb-4"> 
                                • Worked with a group of 8 as a programmer to create Daydreams of Change in Unreal Engine 5
                                for IndieCade’s Climate Jam 2024<br/>
                                • Playtested and reviewed other jam submissions regularly
                            </p>
                    </div>
                    <div className="shadow-lg w-140 h-50 border-2 rounded-xl border-[#ADAD8B]/30 bg-white/80 p-4 mt-8">
                        <div className="flex">
                            <div><img src="/images/brueggerslogo.svg" alt="IndieCade Logo" className="w-20 mb-4 mr-4"/></div>
                            <div>
                                <h2 className="text-2xl font-semibold">Bruegger's Bagels & Jamba Juice</h2>
                                <h3 className="text-lg font-semibold">Team Member</h3>
                                <h4 className="text-black/50 text-sm mb-4">July - September 2021 | Bedford, MA</h4>
                            </div>
                        </div>
                        <p className="mb-4"> 
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