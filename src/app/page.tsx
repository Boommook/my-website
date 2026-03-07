"use client"
import { FC, useState, useEffect } from "react";
import { Project } from "@/components/Project";
import Link from "next/link";

import { Projects } from "@/components/Projects";

const Route: FC = () => {
  const [mx, setMx] = useState<string>("6vw");

  useEffect(() => {
    const documentWidth = typeof document !== "undefined" ? document.documentElement.clientWidth : 1024;
    setMx(documentWidth < 2000 ? documentWidth < 1000 ? "2vw" : "4vw" : "20vw");
  }, []);
  
  return (
    <div className="h-full flex flex-col">
      <div className="!text-left mt-12 mb-8 flex flex-col gap-2" style={{ marginLeft: mx, marginRight: mx }}>
        <h1 className="!text-left !text-6xl font-semibold text-gray">Cole Bennett</h1>
        <h2 className="!text-left !text-2xl text-gray/90">Computer Science and Interactive Media and Game Development Student</h2>
        <p className={`mt-8 text-xl text-gray/80`}>Welcome to my portfolio website!<br/>
            I'm Cole Bennett, a CS+IMGD major at WPI who dreams of applying my skills in computer science to design. Whether you're a potential employer, friend, family member, or a total stranger, please feel free to explore my site!</p>
      </div>
      <div className="flex flex-col justify-center items-center !bg-gray/5 py-12">
        <div className="m-4 flex justify-center">
          <div className="justify-center items-center grid grid-cols-1 md:grid-cols-3 gap-10 mb-4" style={{ marginLeft: mx, marginRight: mx }}>
            {Object.keys(Projects).slice(0, 3).map((project) => (
              <Project key={project} image={Projects[project].image} title={Projects[project].title} labels={Projects[project].labels} filters={Projects[project].filters} link={Projects[project].link} description={Projects[project].description} role={Projects[project].role} teamSize={Projects[project].teamSize} duration={Projects[project].duration} reason={Projects[project].reason} fill={Projects[project].fill} video={Projects[project].video} />
            ))}
          </div>
        </div>
        <Link href={"/projects"} className=" mt-4 text-silver animate-pulse-scale bg-cyan text-3xl p-3 px-4 rounded-3xl
         hover:bg-tangerine/50 font-semibold hover:scale-105 shadow-md shadow-black/50 font-ubuntu transition-colors">View More Projects</Link>
      </div>
    </div>
  );
}

export default Route;