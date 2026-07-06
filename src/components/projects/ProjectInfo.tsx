export type ProjectInfoProps = {
    role: string;
    teamSize: number;
    duration: string;
    reason: string;
    description: string;
}

export const ProjectInfo = ({ role, teamSize, duration, reason, description }: ProjectInfoProps) => {
    return (
        <div className="h-full min-h-0 min-w-0 w-full overflow-auto text-xs lg:text-sm text-start 
        rounded-t-xl !bg-silver/80 p-4 text-gray pt-3">
            <div className="flex min-w-0 gap-x-1"><h3 className="shrink-0 font-semibold">Role: </h3> <p className="min-w-0 break-words">{role}</p></div>
            <div className="flex min-w-0 gap-x-1"><h3 className="shrink-0 font-semibold">Team Size: </h3> <p className="min-w-0 break-words">{teamSize}</p></div>
            <div className="flex min-w-0 gap-x-1"><h3 className="shrink-0 font-semibold">Duration: </h3> <p className="min-w-0 break-words">{duration}</p></div>
            <div className="flex min-w-0 gap-x-1"><h3 className="shrink-0 font-semibold">Reason: </h3> <p className="min-w-0 break-words">{reason}</p></div>
            <hr className="border-gray/50 my-1" />

            <div
                className="min-w-0 rounded px-1 py-0.5 min-h-[4.5rem]"
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
                <p className="break-words text-xs lg:text-sm leading-[1.7em] m-0">{description}</p>
            </div>
        </div>
    )
}