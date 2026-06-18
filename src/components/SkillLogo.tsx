import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

type SkillLogoProps = {
    src: string;
    alt: string;
    widthPerc: number;
    heightPerc: number;
    onClick: () => void;
}

export const SkillLogo = ({ src, alt, widthPerc, heightPerc, onClick }: SkillLogoProps) => {
    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
            <img src={src} alt={alt} onClick={onClick} className={`mb-4 w-[${widthPerc}%] h-[${heightPerc}%] hover:cursor-pointer`} />
            </HoverCardTrigger>
            <HoverCardContent className="flex w-fit flex-col items-center justify-center gap-0.5 shadow-lg border-2 border-tangerine/30 rounded-xl p-2">
                <div className="font-bold">{alt}</div>
                <div>Click to learn more</div>
            </HoverCardContent>
        </HoverCard>
    )
}