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
    }
}