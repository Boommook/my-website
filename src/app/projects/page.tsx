import { FC } from "react"
import {Project} from "@/components/Project"
import { ProjectLabel } from "@/components/ProjectLabel";

const Route: FC = () => {
    return(
    <div className="flex flex-col mb-4">
        <h1 className="mt-6 mb-4 text-gray">Projects</h1>
        <hr className="border-cyan border-3 mb-4 w-60 rounded-2xl mx-auto"/>
        <div className="m-4 flex justify-center">
            <div className="justify-center items-center mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-4">
                <Project image="/images/projects/covidchasegame.jpg" title="Covid Chase" labels={[
                    <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                    <ProjectLabel title="C#" color="bg-label-language"/>,
                    <ProjectLabel title="Unity" color="bg-label-software"/>]} link="https://github.com/Boommook/Covid-Chase" description="Covid Chase is a 2D, local-multiplayer, Covid-themed tag game that I created on Unity. The project began as a way for me to learn Unity and game development, as well as improve my programming skills, but evolved into much more. I began the game in May of 2024, and though it is playable, I am still working on it. Feel free to click the button below to check out the repository and play my game by following the instructions in the README file!"/>
                <Project image="/images/projects/mgbsite.jpg" title="Mass General Brigham Application" labels={[
                    <ProjectLabel title="Leadership" color="bg-label-skill"/>,
                    <ProjectLabel title="TypeScript" color="bg-label-language"/>,
                    <ProjectLabel title="React" color="bg-label-software"/>,
                    <ProjectLabel title="PostgreSQL" color="bg-label-software"/>]} link="https://www.massgeneralbrigham.co/"
                    description="I worked as the senior front-End software lead engineer and project manager in a group of 10 to develop an application for the Mass General Brigham Hospital. The application featured hospital pathfinding, service request components, an employee forum, and calendar. The application was created with React, Express, PostgreSQL."/>
                <Project image="/images/projects/23DoverHome.jpg" title="23 Dover Street" labels={[
                    <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                    <ProjectLabel title="C++" color="bg-label-language"/>,
                    <ProjectLabel title="SFML" color="bg-label-software"/>]} link="https://www.massgeneralbrigham.co/"
                    description="For Technical Game Development I at WPI, I followed the professor’s textbook to create his 2D game engine, Dragonfly, with C++ and SFML. Afterwards, I worked with a partner to use the engine to develop a tower defense game based on the mouse infestation of an apartment. The game features sprites made from text, a variety of traps, currency, and ramping intensity. To play the game, follow the button below, navigate to the 23 Dover Street game, and follow the instructions at the top of the site."/>
                <Project image="/images/projects/daydreamsofchange.png" title="Daydreams of Change" labels={[
                    <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                    <ProjectLabel title="Unreal Engine" color="bg-label-software"/>]} link="https://janewaffle.itch.io/daydreams-of-change"
                    description="Daydreams of Change is a singleplayer game that I helped make in a group of 8 on Unreal Engine 5​ as a game design intern for Climate Jam 2024. During the jam, I was one of my group's programmers and learned UE5 from scratch. Feel free to click the button below to see our game's submission page and play it."/>
                <Project image="/images/projects/castlerender.jpg" title="3D Model of Castle" labels={[
                    <ProjectLabel title="3D Modeling" color="bg-label-skill"/>,
                    <ProjectLabel title="Blender" color="bg-label-software"/>,]} link="https://drive.google.com/file/d/1crgepynquZvkS3EfK7MlNZ7AdyQLc1qc/view"
                    description="The images to the right are taken from the rendered animation of my 3D modeled low-poly castle that circles the castle, zooming in and out. I used Blender to model everything, and made multiple features animated. This was created during my senior year of high school, during which I taught myself Blender. The button below will bring you to the file to watch the video itself, check it out!"/>
                <Project image="/images/projects/thorkellproject.png" title="Thorkell 3D Model" labels={[
                    <ProjectLabel title="3D Modeling" color="bg-label-skill"/>,
                    <ProjectLabel title="3D Painting" color="bg-label-skill"/>,
                    <ProjectLabel title="ZBrush" color="bg-label-software"/>]} link="https://drive.google.com/drive/folders/11NZuhAcbMwbKFAJCDE1190WE-ew8qxQo?usp=sharing"
                    description="I used ZBrush to 3D model and paint the character, 'Thorkell', from Vinland Saga in an A-pose for 3D Modeling I or AR/IMGD 2101 at WPI. This was a fairly simple project that took just a few weeks, but it was a good benchmark of my growth in 3D modeling. If you'd like to see more views of my model, click the button below!"/>
            <Project image="/images/projects/theotherside.png" title="The Other Side" labels={[
                    <ProjectLabel title="Game Development" color="bg-label-skill"/>,
                    <ProjectLabel title="Leadership" color="bg-label-skill"/>]} link="https://boommook.github.io/Cole-Bennett-Website/images/Rule%20Sheet%206.0.pdf"
                    description="The Other Side is a strategic competitive board game to be played with 4 friends! I led my group of 4 as project lead to make this game in Digital Game Design I. We were limited to making the rules fit on the front and back of a page and able to be played with common school or home items. Making this game helped me develop my game development and design skills."
                    />
            </div>
        </div>
    </div>
    );
}

export default Route;
