"use client"
import { FC, useState, useEffect } from "react"
import {Project} from "@/components/projects/Project"
import { ProjectLabel } from "@/components/projects/ProjectLabel";
import {Funnel, Check} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Projects } from "@/components/projects/Projects"
import { ProjectInfoPopup } from "@/components/ProjectInfoPopup"

const LANGUAGES = ["C#", "C++", "C", "TypeScript", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS", "Git"]
const SKILLS = ["Game Development", "Leadership", "3D Modeling", "3D Painting", "Web Development"]
const SOFTWARE = ["Unreal Engine", "Unity", "Maya", "Blender", "ZBrush", "Solidworks"]
const FRAMEWORKS = ["React", "Node.js", "Next.js"]
const DATABASES = ["MySQL", "PostgreSQL"]

const Route: FC = () => {
    const [singleFilter, setSingleFilter] = useState<string>("");
    const [filteredProjects, setFilteredProjects] = useState<string[]>(Object.keys(Projects))
    const [mx, setMx] = useState<string>("4vw")

    useEffect(() => {
        if (singleFilter === "") {
            setFilteredProjects(Object.keys(Projects))
        } else {
            setFilteredProjects(
                Object.keys(Projects).filter((key) =>
                    Projects[key].filters.includes(singleFilter)
                )
            )
        }
    }, [singleFilter])

    useEffect(() => {
        const documentWidth = typeof document !== "undefined" ? document.documentElement.clientWidth : 1024
        setMx(documentWidth < 2000 ? documentWidth < 1000 ? "2vw" : "4vw" : "20vw")
    }, [])

    return(
    <div className="flex w-full flex-1 flex-col items-stretch">
        <ProjectInfoPopup  />
        <div className="self-center flex flex-col items-center justify-center gap-x-2 mt-6 gap-1">
            <div className="flex flex-row justify-center items-center">
                <h1 className=" text-gray items-center justify-center">Projects</h1>
                
                <DropdownMenu>
                <DropdownMenuTrigger className="w-12 h-12 rounded-full hover:bg-cyan/5 focus:outline-none hover:scale-105 flex items-center justify-center p-3 hover:cursor-pointer">
                    <Funnel className="w-8 h-8 text-cyan shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="font-semibold !py-1">Filter by: {singleFilter}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-language px-2 pb-1 pt-[0.5] rounded-md text-silver">Languages</h3></DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {LANGUAGES.map((language) => (
                            <DropdownMenuItem key={language} onClick={() => setSingleFilter(language)} className={`${singleFilter === language ? "bg-cyan/10 text-cyan" : ""}`}>{language} 
                            {singleFilter === language && <Check className="w-4 h-4 text-cyan" />}</DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-skill px-2 pb-1 pt-[0.5] rounded-md text-silver">Skills</h3></DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {SKILLS.map((skill) => (
                            <DropdownMenuItem key={skill} onClick={() => setSingleFilter(skill)} className={`${singleFilter === skill ? "bg-cyan/10 text-cyan" : ""}`}>{skill} {singleFilter === skill && <Check className="w-4 h-4 text-cyan" />}</DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-software px-2 pb-1 pt-[0.5] rounded-md text-silver">Software</h3></DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {SOFTWARE.map((software) => (
                            <DropdownMenuItem key={software} onClick={() => setSingleFilter(software)} className={`${singleFilter === software ? "bg-cyan/10 text-cyan" : ""}`}>{software} {singleFilter === software && <Check className="w-4 h-4 text-cyan" />}</DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-framework px-2 pb-1 pt-[0.5] rounded-md text-silver">Frameworks</h3></DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {FRAMEWORKS.map((framework) => (
                            <DropdownMenuItem key={framework} onClick={() => setSingleFilter(framework)} className={`${singleFilter === framework ? "bg-cyan/10 text-cyan" : ""}`}>{framework} {singleFilter === framework && <Check className="w-4 h-4 text-cyan" />}</DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-database px-2 pb-1 pt-[0.5] rounded-md text-silver">Databases</h3></DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {DATABASES.map((database) => (
                            <DropdownMenuItem key={database} onClick={() => setSingleFilter(database)} className={`${singleFilter === database ? "bg-cyan/10 text-cyan" : ""}`}>{database} {singleFilter === database && <Check className="w-4 h-4 text-cyan" />}</DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSingleFilter("")} className="!p-1 hover:cursor-pointer">Clear Filter</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <hr className="self-center border-cyan border-3 mb-4 w-60 rounded-2xl"/>
        </div>
        <div className="m-0 md:m-2 pb-4 flex flex-1 w-full justify-center">
            <div className="min-w-0 w-full flex-1 content-center justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12" style={{ marginLeft: mx, marginRight: mx }}>
                {filteredProjects.length > 0 && filteredProjects.map((project) => (
                        <Project key={project} image={Projects[project].image} title={Projects[project].title} labels={Projects[project].labels} filters={Projects[project].filters} link={Projects[project].link} description={Projects[project].description} role={Projects[project].role} teamSize={Projects[project].teamSize} duration={Projects[project].duration} reason={Projects[project].reason} fill={Projects[project].fill} video={Projects[project].video} />
                ))}
                {filteredProjects.length === 0 && <h2 className="col-span-1 md:col-span-2 lg:col-span-3 mx-auto text-gray text-lg text-center">
                    No projects with the  <span className="font-semibold">{singleFilter}</span> filter have been added to my portfolio yet.
                    </h2>}
            </div>
        </div>
    </div>
    );
}

export default Route;
