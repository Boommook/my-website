"use client"
import { FC } from "react";
import { Project } from "@/components/Project";
import { ProjectLabel } from "@/components/ProjectLabel";
import Link from "next/link";

const Route: FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="!text-left ml-8 my-16 flex flex-col gap-2 mr-75">
        <h1 className="!text-left !text-6xl font-semibold">Cole Bennett</h1>
        <h2 className="!text-left !text-2xl">Computer Science and Interactive Media and Game Development Student</h2>
        <p className=" mt-8 text-lg !text-dark-turquoie/150">Welcome to my portfolio website!<br/>
            I'm Cole Bennett, a CS+IMGD major at WPI who dreams of applying my skills in computer science to design. Whether you're a potential employer, friend, family member, or a total stranger, please feel free to explore my site!</p>
      </div>
      <div className="flex flex-col justify-center items-center !bg-[#ada38b]/10 py-16 pb-12">
        <div className="m-4 flex justify-center">
          <div className="justify-center items-center mx-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-4">
            <Project image="/images/projects/covidchasegame.jpg" title="Covid Chase" labels={[
                <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                <ProjectLabel title="C#" color="bg-label-language"/>,
                <ProjectLabel title="Unity" color="bg-label-software"/>]} link="https://github.com/Boommook/Covid-Chase" description="Covid Chase is a 2D, local-multiplayer, Covid-themed tag game that I created on Unity. The project began as a way for me to learn Unity and game development, as well as improve my programming skills, but evolved into much more. I began the game in May of 2024, and though it is playable, I am still working on it. Feel free to click the button below to check out the repository and play my game by following the instructions in the README file!"/>
            <Project image="/images/projects/mgbsite.jpg" title="Mass General Brigham Application" labels={[
                <ProjectLabel title="Leadership" color="bg-label-skill"/>,
                <ProjectLabel title="TypeScript" color="bg-label-language"/>,
                <ProjectLabel title="React" color="bg-label-software"/>,
                <ProjectLabel title="PostgreSQL" color="bg-label-software"/>]} link="https://www.massgeneralbrigham.co/"
                description="I worked as the senior front-End software lead engineer and project manager in a group of 10 to develop an application for the Mass General Brigham Hospital. The application featured hospital pathfinding, service request components, an employee forum, and calendar. The application was created with React, Express, PostgreSQL."/>
            <Project image="/images/projects/23DoverHome.jpg" title="23 Dover Street" labels={[
                <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                <ProjectLabel title="C++" color="bg-label-language"/>,
                <ProjectLabel title="SFML" color="bg-label-software"/>]} link="https://www.massgeneralbrigham.co/"
                description="For Technical Game Development I at WPI, I followed the professor’s textbook to create his 2D game engine, Dragonfly, with C++ and SFML. Afterwards, I worked with a partner to use the engine to develop a tower defense game based on the mouse infestation of an apartment. The game features sprites made from text, a variety of traps, currency, and ramping intensity. To play the game, follow the button below, navigate to the 23 Dover Street game, and follow the instructions at the top of the site."/>
          </div>
        </div>
        <Link href={"/projects"} className=" mt-4 text-[#e9f2f2] animate-pulse-scale bg-dark-turquoise/75 text-3xl p-3 px-4 rounded-3xl
         hover:bg-dark-turquoise/90 hover:text-lightblue shadow-lg font-ubuntu">View More Projects</Link>
      </div>
    </div>
  );
}

export default Route;