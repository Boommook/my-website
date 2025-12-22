"use client"
import { FC, useState, useEffect } from "react"
import {Project} from "@/components/Project"
import { ProjectLabel } from "@/components/ProjectLabel";
import {Funnel} from "lucide-react"
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

import { Projects } from "@/components/Projects"

const LANGUAGES = ["C#", "C++", "C", "TypeScript", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS", "Git"]
const SKILLS = ["Game Development", "Leadership", "3D Modeling", "3D Painting"]
const SOFTWARE = ["Unreal Engine", "Unity", "Maya", "Blender", "ZBrush", "Solidworks"]
const FRAMEWORKS = ["React", "Node.js"]
const DATABASES = ["MySQL", "PostgreSQL"]

const Route: FC = () => {
    const [singleFilter, setSingleFilter] = useState<string>("");
    const [filteredProjects, setFilteredProjects] = useState<string[]>(Object.keys(Projects))

    useEffect(() => {
        if (singleFilter === "") {
            setFilteredProjects(Object.keys(Projects))
        } else {
            setFilteredProjects(Object.values(Projects).filter((project) => project.filters.includes(singleFilter)).map((project) => project.title))
        }
    }, [singleFilter])

    return(
    <div className="flex flex-col mb-4 items-center justify-center">
        <div className="flex items-center justify-center gap-x-8">
            <h1 className="mt-6 mb-4 text-gray items-center justify-center">Projects</h1>
            <DropdownMenu>
            <DropdownMenuTrigger><Funnel className="w-8 h-8 text-cyan items-center justify-center hover:cursor-pointer"/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="font-semibold !py-1">Filter by: {singleFilter}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-language px-2 pb-1 pt-[0.5] rounded-md text-silver">Languages</h3></DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {LANGUAGES.map((language) => (
                        <DropdownMenuItem key={language} onClick={() => setSingleFilter(language)}>{language}</DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-skill px-2 pb-1 pt-[0.5] rounded-md text-silver">Skills</h3></DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {SKILLS.map((skill) => (
                        <DropdownMenuItem key={skill} onClick={() => setSingleFilter(skill)}>{skill}</DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-software px-2 pb-1 pt-[0.5] rounded-md text-silver">Software</h3></DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {SOFTWARE.map((software) => (
                        <DropdownMenuItem key={software} onClick={() => setSingleFilter(software)}>{software}</DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
            <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-framework px-2 pb-1 pt-[0.5] rounded-md text-silver">Frameworks</h3></DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {FRAMEWORKS.map((framework) => (
                        <DropdownMenuItem key={framework} onClick={() => setSingleFilter(framework)}>{framework}</DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="!p-1"><h3 className="bg-label-database px-2 pb-1 pt-[0.5] rounded-md text-silver">Databases</h3></DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {DATABASES.map((database) => (
                        <DropdownMenuItem key={database} onClick={() => setSingleFilter(database)}>{database}</DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <hr className="border-cyan border-3 mb-4 w-60 rounded-2xl mx-auto"/>
        <div className="m-4 flex justify-center">
            <div className="w-full justify-center items-center mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-4">
                {filteredProjects.length > 0 && filteredProjects.map((project) => (
                    <Project key={project} image={Projects[project].image} title={Projects[project].title} labels={Projects[project].labels} filters={Projects[project].filters} link={Projects[project].link} description={Projects[project].description}/>
                ))}
                {filteredProjects.length === 0 && <h2 className="flex col-span-3 mx-auto text-gray text-lg text-center justify-center items-center">No projects with that filter have been added to my portfolio yet.</h2>}
            </div>
        </div>
    </div>
    );
}

export default Route;
