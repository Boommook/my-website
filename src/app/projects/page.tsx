"use client";

import { useMemo, useState } from "react";
import { Check, Funnel } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Project } from "@/components/projects/Project";
import { Projects } from "@/components/projects/Projects";
import { ProjectInfoPopup } from "@/components/ProjectInfoPopup";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const FILTER_GROUPS = [
  { label: "Languages", color: "bg-label-language", values: ["C#", "C++", "C", "TypeScript", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS", "Git"] },
  { label: "Skills", color: "bg-label-skill", values: ["Game Development", "Leadership", "3D Modeling", "3D Painting", "Web Development"] },
  { label: "Software", color: "bg-label-software", values: ["Unreal Engine", "Unity", "Maya", "Blender", "ZBrush", "Solidworks"] },
  { label: "Frameworks", color: "bg-label-framework", values: ["React", "Node.js", "Next.js"] },
  { label: "Databases", color: "bg-label-database", values: ["MySQL", "PostgreSQL"] },
] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("");
  const reduceMotion = useReducedMotion();
  const filteredProjects = useMemo(() => Object.keys(Projects).filter((key) => !activeFilter || Projects[key].filters.includes(activeFilter)), [activeFilter]);

  return (
    <div className="flex w-full flex-1 flex-col items-stretch">
      <ProjectInfoPopup />
      <div className="mt-6 flex flex-col items-center gap-1 self-center">
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-gray">Projects</h1>
          <DropdownMenu>
            <DropdownMenuTrigger aria-label={activeFilter ? `Filter projects. Current filter: ${activeFilter}` : "Filter projects"} className="flex h-12 w-12 items-center justify-center rounded-full p-3 hover:cursor-pointer hover:bg-cyan/5 hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tangerine">
              <Funnel className="h-8 w-8 shrink-0 text-cyan" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-[min(32rem,calc(100vh-6rem))] overflow-y-auto">
              <DropdownMenuLabel className="py-1 font-semibold">{activeFilter ? `Filtered by: ${activeFilter}` : "Filter by category"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FILTER_GROUPS.map((group) => (
                <DropdownMenuSub key={group.label}>
                  <DropdownMenuSubTrigger className="p-1"><span className={`${group.color} rounded-md px-2 py-0.5 text-silver`}>{group.label}</span></DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {group.values.map((value) => (
                        <DropdownMenuItem key={value} onSelect={() => setActiveFilter(value)} className={activeFilter === value ? "bg-cyan/10 text-cyan" : ""}>
                          <span className="flex-1">{value}</span>{activeFilter === value && <Check aria-hidden className="h-4 w-4 text-cyan" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={!activeFilter} onSelect={() => setActiveFilter("")}>Clear Filter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {activeFilter && <p className="text-sm text-gray/80" aria-live="polite">Showing: <span className="font-semibold text-cyan">{activeFilter}</span></p>}
        <hr className="mb-4 w-60 rounded-2xl border-3 border-cyan" />
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-1 justify-center px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid min-w-0 w-full grid-cols-1 content-center items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div key={project} layout={!reduceMotion} initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.96 }} transition={reduceMotion ? { duration: 0.12 } : { delay: index * 0.05, type: "spring", stiffness: 320, damping: 26, mass: 0.9 }} className="min-w-0 w-full">
                <Project {...Projects[project]} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && <h2 className="col-span-full mx-auto text-center text-lg text-gray">No projects with the <span className="font-semibold">{activeFilter}</span> filter have been added to my portfolio yet.</h2>}
        </div>
      </div>
    </div>
  );
}
