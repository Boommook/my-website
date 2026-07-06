import { AssignmentCardProps } from "./AssignmentCard";
import { withBasePath } from "@/lib/paths";

export type AssignmentsType = Record<string, AssignmentCardProps>

export const Assignments: AssignmentsType = {
    "A1": {
        title: "A1: Shader Live Coding",
        documentation: withBasePath("/docs/a1.md"),
        code: withBasePath("/code/assignment1.wgsl"),
        video: "https://www.youtube.com/watch?v=f6gliVzHz7E",
        date: "2026-03-20",
        image: withBasePath("/images/imgd_4300/a1.jpg"),
    },
    "A3": {
        title: "A3: Gulls / Video WebGPU",
        documentation: withBasePath("/docs/a3.md"),
        code: withBasePath("/imgd_4300/a3/main.js"),
        demo: withBasePath("/imgd_4300/a3"),
        date: "2026-03-30",
        image: withBasePath("/images/imgd_4300/a3.png"),
    },
    "A4": {
        title: "A4: Reaction Diffusion",
        documentation: withBasePath("/docs/a4.md"),
        code: withBasePath("/imgd_4300/a4/main.js"),
        demo: withBasePath("/imgd_4300/a4"),
        date: "2026-04-04",
        image: withBasePath("/images/imgd_4300/a4.jpg"),
    },
    "A5a": {
        title: "A5a: WebGPU App",
        documentation: withBasePath("/docs/a5.md"),
        code: withBasePath("/imgd_4300/a5/index.html"),
        demo: withBasePath("/imgd_4300/a5"),
        date: "2026-04-10",
        image: withBasePath("/images/imgd_4300/a5.jpg"),
    },
    "A5b": {
        title: "A5b: Particles",
        documentation: withBasePath("/docs/a5b.md"),
        code: "https://github.com/Boommook/my-website/tree/main/public/imgd_4300/a5b",
        demo: withBasePath("/imgd_4300/a5b"),
        date: "2026-04-15",
        image: withBasePath("/images/imgd_4300/a5b.jpg"),
    },
    "A6": {
        title: "A6: Vants",
        documentation: withBasePath("/docs/a6.md"),
        code: "https://github.com/Boommook/my-website/tree/main/public/imgd_4300/a6",
        demo: withBasePath("/imgd_4300/a6"),
        date: "2026-04-18",
        image: withBasePath("/images/imgd_4300/a6.jpg"),
    },
    "Final": {
        title: "Final: Hungry Vants",
        documentation: withBasePath("/docs/final.md"),
        code: withBasePath("/imgd_4300/final/main.js"),
        demo: withBasePath("/imgd_4300/final"),
        date: "2026-04-23",
        image: withBasePath("/images/imgd_4300/final.png"),
    }

}
