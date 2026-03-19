import { AssignmentCardProps } from "./AssignmentCard";
import { AssignmentEnlarged } from "./AssignmentEnlarged";
export type AssignmentsType = Record<string, AssignmentCardProps>

export const Assignments: AssignmentsType = {
    "Assignment 1": {
        title: "Assignment 1",
        description: "Assignment 1 description",
        link: "https://www.google.com",
        date: "2026-01-01",
        image: "/images/projects/theotherside.png",
        enlarged: <AssignmentEnlarged title="Assignment 1" description="Assignment 1 description" link="https://www.google.com" date="2026-01-01" image="/images/imgd_4300/assignment1.png" documentation="Assignment 1 documentation" />
    }
}