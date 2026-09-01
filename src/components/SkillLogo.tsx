import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

type SkillLogoProps = {
    src: string;
    alt: string;
    large?: boolean;
    onClick: () => void;
}

export const SkillLogo = ({ src, alt, large = false, onClick }: SkillLogoProps) => {
    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
            <button
                type="button"
                onClick={onClick}
                className={cn(
                    "mb-1 inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0 hover:cursor-pointer",
                    large
                        ? "h-20 w-20 md:h-24 md:w-24"
                        : "h-16 w-16 md:h-20 md:w-20",
                )}
            >
                <img src={src} alt={alt} className="h-full w-full object-contain" />
            </button>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-fit flex-col items-center justify-center gap-0.5 shadow-lg border-2 border-tangerine/30 rounded-xl p-2">
                <div className="font-bold">{alt}</div>
                <div>Click to learn more</div>
            </HoverCardContent>
        </HoverCard>
    )
}
