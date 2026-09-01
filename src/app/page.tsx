import { Project } from "@/components/projects/Project";
import Link from "next/link";
import { RevealText } from "@/components/RevealText";

import { Projects } from "@/components/projects/Projects";

const Route = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mx-auto mt-10 mb-8 flex w-full max-w-7xl flex-col gap-2 px-4 sm:px-6 lg:px-8">
        <h1 className="!text-left text-5xl font-semibold text-gray sm:text-6xl">Cole Bennett</h1>
        <h2 className="!text-left text-xl text-gray/90 sm:text-2xl">Computer Science and Interactive Media and Game Development Student</h2>
        <RevealText className="mt-8 text-xl text-gray/80" delay={0.2}>
          Welcome to my portfolio website!
          <br />
          I&apos;m Cole Bennett, a CS+IMGD major at WPI who dreams of applying my skills in computer science to design. Whether you&apos;re a potential employer, friend, family member, or a total stranger, please feel free to explore my site!
        </RevealText>
      </div>
      
      <div className="flex w-full flex-col justify-center items-stretch !bg-gray/5 py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-1 justify-center px-4 pb-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {Object.keys(Projects).slice(0, 3).map((project) => (
              <Project key={project} image={Projects[project].image} title={Projects[project].title} labels={Projects[project].labels} filters={Projects[project].filters} link={Projects[project].link} description={Projects[project].description} role={Projects[project].role} teamSize={Projects[project].teamSize} duration={Projects[project].duration} reason={Projects[project].reason} fill={Projects[project].fill} video={Projects[project].video} />
            ))}
          </div>
        </div>
        <Link href="/projects" className="animate-pulse-scale mt-4 self-center rounded-3xl bg-cyan px-4 py-3 font-ubuntu text-2xl font-semibold text-silver shadow-md shadow-black/50 transition duration-300 hover:scale-105 hover:bg-tangerine/75 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-tangerine sm:text-3xl">View More Projects</Link>
      </div>
    </div>
  );
}

export default Route;
