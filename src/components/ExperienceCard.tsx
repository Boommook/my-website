type ExperienceCardProps = {
    company: string;
    position: string;
    location: string;
    image: string;
    link: string;
    duration: string;
    responsibilities: string[];
}

export const ExperienceCard = ({ company, position, location, responsibilities, image, link, duration }: ExperienceCardProps) => {
    return (
        <div className="shadow-lg w-[85%] md:w-150 h-fit border-2 rounded-xl border-tangerine/30 p-4 bg-lightgray">
            <div className="flex items-start">
                <img src={image} alt={company} className="w-20 mt-2 mb-4 mr-4 rounded-lg hover:cursor-pointer" onClick={() => window.open(link, "_blank")}/>
                <div>
                    <h2 className="text-md md:text-xl font-semibold text-gray">{company}</h2>
                    <h3 className="text-sm md:text-lg font-semibold text-gray/90">{position}</h3>
                    <h4 className="text-gray/50 text-sm mb-4">{duration} | {location}</h4>
                </div>
            </div>
                <p className="mb-2 text-sm md:text-[16px] list-disc pl-5 text-gray/80"> 
                    {responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                    ))}
                </p>
        </div>
    )
}