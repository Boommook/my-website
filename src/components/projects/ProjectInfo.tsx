export type ProjectInfoProps = {
    role: string;
    teamSize: number;
    duration: string;
    reason: string;
    description: string;
    flipped: boolean;
    setFlipped: (flipped: boolean) => void;
}

export const ProjectInfo = ({ role, teamSize, duration, reason, description, flipped, setFlipped }: ProjectInfoProps) => {
    return (
        <div onClick={() => setFlipped(!flipped)} className="h-full min-h-0 w-full min-w-0 overflow-auto text-xs lg:text-sm text-start 
        rounded-t-xl !bg-silver/80 p-4 text-gray pt-3">
            <div className="flex gap-x-1"><h3 className="font-semibold">Role: </h3> <p>{role}</p></div>
            <div className="flex gap-x-1"><h3 className="font-semibold">Team Size: </h3> <p>{teamSize}</p></div>
            <div className="flex gap-x-1"><h3 className="font-semibold">Duration: </h3> <p>{duration}</p></div>
            <div className="flex gap-x-1"><h3 className="font-semibold">Reason: </h3> <p>{reason}</p></div>
            <hr className="border-gray/50 my-1" />

            <div
                className="rounded px-1 py-0.5 min-h-[4.5rem]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        transparent,
                        transparent 0,
                        transparent calc(1.7em - 1px),
                        rgba(0,0,0,0.1) calc(1.7em - 1px),
                        rgba(0,0,0,0.1) 1.7em
                    )`,
                }}
            >
                <p className="text-xs lg:text-sm leading-[1.7em] m-0 ">{description}</p>
            </div>
        </div>
    )
}