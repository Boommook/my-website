import { AssignmentCardProps } from "./AssignmentCard";
export type AssignmentsType = Record<string, AssignmentCardProps>

export const Assignments: AssignmentsType = {
    "A1": {
        title: "A1: Shader Live Coding",
        documentation: "/docs/a1.md",
        code: "/code/assignment1.wgsl",
        video: "https://www.youtube.com/watch?v=f6gliVzHz7E",
        date: "2026-03-20",
        image: "/images/imgd_4300/a1.jpg",
    },
    "A3": {
        title: "A3: Gulls / Video WebGPU",
        documentation: "/docs/a3.md",
        code: "/imgd_4300/a3/main.js",
        demo: "/imgd_4300/a3",
        date: "2026-03-30",
        image: "/images/imgd_4300/a3.png",
    },
    "A4": {
        title: "A4: Reaction Diffusion",
        documentation: "/docs/a4.md",
        code: "/imgd_4300/a4/main.js",
        demo: "/imgd_4300/a4",
        date: "2026-04-04",
        image: "/images/imgd_4300/a4.jpg",
    },
    "A5a": {
        title: "A5a: WebGPU App",
        documentation: "/docs/a5.md",
        code: "/imgd_4300/a5/index.html",
        demo: "/imgd_4300/a5",
        date: "2026-04-10",
        image: "/images/imgd_4300/a5.jpg",
    },
    "A5b": {
        title: "A5b: Particles",
        documentation: "/docs/a5b.md",
        code: "https://github.com/Boommook/my-website/tree/main/public/imgd_4300/a5b",
        demo: "/imgd_4300/a5b",
        date: "2026-04-15",
        image: "/images/imgd_4300/a5b.jpg",
    },
    "A6": {
        title: "A6: Vants",
        documentation: "/docs/a6.md",
        code: "https://github.com/Boommook/my-website/tree/main/public/imgd_4300/a6",
        demo: "/imgd_4300/a6",
        date: "2026-04-18",
        image: "/images/imgd_4300/a6.jpg",
    }

}