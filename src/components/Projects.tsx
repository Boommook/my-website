import { Project } from "./Project"
import { ProjectLabel } from "./ProjectLabel"
import { ProjectProps } from "./Project"

export type ProjectsType = Record<string, ProjectProps>

export const Projects: ProjectsType = {
    "Memory of Nations Interactive Map": {
        image: "/images/projects/MoN_Map.png",
        title: "Memory of Nations Interactive Map",
        labels: [
            <ProjectLabel title="TypeScript" color="bg-label-language"/>,
            <ProjectLabel title="React" color="bg-label-framework"/>,
            <ProjectLabel title="MySQL" color="bg-label-database"/>
        ],
        filters: ["TypeScript", "React", "MySQL", "Git", "Node.js"],
        link: "https://github.com/Jakefoley88/PostBellum_InteractiveMap.git",
        role: "Lead Front-End Developer",
        teamSize: 4,
        duration: "2 months",
        reason: "Third Year Capstone Project (IQP)",
        description: "Developed an interactive map that improves engagement and connection with historical testimonies from the 20th and 21st centuries outside of the Czech Republic, collected and preserved by Post Bellum. The map will be integrated into the Memory of Nations website once Post Bellum addresses internal technical issues."
    },
    "Covid Chase": {
        image: "/images/projects/covidchasegame.jpg",
        title: "Covid Chase",
        labels: [
            <ProjectLabel title="Game Development" color="bg-label-skill"/>,
            <ProjectLabel title="C#" color="bg-label-language"/>,
            <ProjectLabel title="Unity" color="bg-label-software"/>
        ],
        filters: ["Game Development", "C#", "Unity"],
        link: "https://github.com/Boommook/Covid-Chase",
        role: "Lead Developer",
        teamSize: 1,
        duration: "1.5 years ongoing",
        reason: "Personal Project",
        description: "Covid Chase is a 2D, local-multiplayer, Covid-themed tag game created on Unity. The project began as a way for me to learn Unity and game development, as well as improve my programming skills, but evolved into much more. I began the game in May of 2024, and though it is playable, I am still working on it. Try it out by clicking the button below and following the instructions in the README!"
    },
    "Mass General Brigham Application": {
        image: "/images/projects/mgbsite.jpg",
        title: "Mass General Brigham Application",
        labels: [
            <ProjectLabel title="Leadership" color="bg-label-skill"/>,
            <ProjectLabel title="TypeScript" color="bg-label-language"/>,
            <ProjectLabel title="React" color="bg-label-framework"/>,
            <ProjectLabel title="PostgreSQL" color="bg-label-database"/>
        ],
        filters: ["Leadership", "TypeScript", "React", "PostgreSQL", "Node.js", "Git"],
        link: "https://www.massgeneralbrigham.co/",
        role: "Senior Lead Front-End Developer",
        teamSize: 10,
        duration: "2 months",
        reason: "Software Engineering Course",
        description: "Developed an application for the Mass General Brigham Hospital. The application featured hospital pathfinding, service request components, an employee forum, and calendar. The application was created with React, Express, PostgreSQL."
    },
    "23 Dover Street": {
        image: "/images/projects/23DoverHome.jpg",
        title: "23 Dover Street",
        labels: [
            <ProjectLabel title="Game Development" color="bg-label-skill"/>,
            <ProjectLabel title="C++" color="bg-label-language"/>,
            <ProjectLabel title="SFML" color="bg-label-software"/>
        ],
        filters: ["Game Development", "C++", "SFML", "Git"],
        link: "https://www.massgeneralbrigham.co/",
        role: "Co-Developer",
        teamSize: 2,
        duration: "2 months",
        reason: "Technical Game Development Course",
        description: "Followed the professor’s textbook to create his 2D game engine, Dragonfly, with C++ and SFML. Afterwards, worked with a partner to use the engine to develop a tower defense game based on the mouse infestation of an apartment. The game features sprites made from text, a variety of traps, currency, and ramping intensity."
    },
    "Daydreams of Change": {
        image: "/images/projects/daydreamsofchange.png",
        title: "Daydreams of Change",
        labels: [
            <ProjectLabel title="Game Development" color="bg-label-skill"/>,
            <ProjectLabel title="Unreal Engine" color="bg-label-software"/>
        ],
        filters: ["Game Development", "Unreal Engine", "Git"],
        link: "https://janewaffle.itch.io/daydreams-of-change",
        role: "Programmer",
        teamSize: 8,
        duration: "1 month",
        reason: "Game Design Internship",
        description: "Daydreams of Change is a singleplayer game that I helped make in a group of 8 on Unreal Engine 5​ as a game design intern for Climate Jam 2024. During the jam, I was one of my group's programmers and learned UE5 from scratch. Feel free to click the button below to see our game's submission page and play it."
    },
    "3D Model of Castle": {
        image: "/images/projects/castlerender.jpg",
        title: "3D Model of Castle",
        labels: [
            <ProjectLabel title="3D Modeling" color="bg-label-skill"/>,
            <ProjectLabel title="Blender" color="bg-label-software"/>,
        ],
        filters: ["3D Modeling", "Blender"],
        link: "https://drive.google.com/file/d/1crgepynquZvkS3EfK7MlNZ7AdyQLc1qc/view",
        role: "Modeler",
        teamSize: 1,
        duration: "2 months",
        reason: "High School Project",
        description: "Rendered animation of my 3D modeled low-poly castle that circles the castle, zooming in and out. I used Blender to model everything, and made multiple features animated. This was created during my senior year of high school, during which I taught myself Blender. The button below will bring you to the file to watch the video itself, check it out!"
    },
    "Thorkell 3D Model": {
        image: "/images/projects/thorkellproject.png",
        title: "Thorkell 3D Model",
        labels: [
            <ProjectLabel title="3D Modeling" color="bg-label-skill"/>,
            <ProjectLabel title="3D Painting" color="bg-label-skill"/>,
            <ProjectLabel title="ZBrush" color="bg-label-software"/>
        ],
        filters: ["3D Modeling", "3D Painting", "ZBrush", "Maya"],
        link: "https://drive.google.com/drive/folders/11NZuhAcbMwbKFAJCDE1190WE-ew8qxQo?usp=sharing",
        role: "Modeler",
        teamSize: 1,
        duration: "1 months",
        reason: "3D Modeling Course",
        description: "I used ZBrush to 3D model and paint the character, 'Thorkell', from Vinland Saga in an A-pose for 3D Modeling I or AR/IMGD 2101 at WPI. This was a fairly simple project that took just a few weeks, but it was a good benchmark of my growth in 3D modeling. If you'd like to see more views of my model, click the button below!"
    },
    "The Other Side": {
        image: "/images/projects/theotherside.png",
        title: "The Other Side",
        labels: [
            <ProjectLabel title="Game Development" color="bg-label-skill"/>,
            <ProjectLabel title="Leadership" color="bg-label-skill"/>
        ],
        filters: ["Game Development", "Leadership"],
        link: "https://boommook.github.io/Cole-Bennett-Website/images/Rule%20Sheet%206.0.pdf",
        role: "Project Manager",
        teamSize: 4,
        duration: "1 month",
        reason: "Digital Game Design Course",
        description: "The Other Side is a strategic competitive board game to be played with 4 friends! I led my group of 4 as project lead to make this game in Digital Game Design I. We were limited to making the rules fit on the front and back of a page and able to be played with common school or home items. Making this game helped me develop my game development and design skills."
    }
}