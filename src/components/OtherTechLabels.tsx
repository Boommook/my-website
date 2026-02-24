import { useLayoutEffect, useRef, useState } from "react";
import { TechLabel } from "./TechnologyLabel";

const OTHER_TECH_LABELS = [
    { title: "Git", link: "https://en.wikipedia.org/wiki/Git" },
    { title: "Next.js", link: "https://nextjs.org/" },
    { title: "Node.js", link: "https://nodejs.org/en/" },
    { title: "Express", link: "https://expressjs.com/" },
    { title: "PostgreSQL", link: "https://www.postgresql.org/" },
    { title: "MySQL", link: "https://www.mysql.com/" },
    { title: "Linux", link: "https://www.linux.org/" },
] as const;

export const OtherTechLabels = () => {
    const measureRef = useRef<HTMLDivElement>(null);
    const [maxWidth, setMaxWidth] = useState<number | null>(null);

    useLayoutEffect(() => {
        const el = measureRef.current;
        if (!el) return;
        const labels = el.querySelectorAll<HTMLElement>("[data-tech-label]");
        let max = 0;
        labels.forEach((node) => {
            max = Math.max(max, node.offsetWidth);
        });
        setMaxWidth(max);
    }, []);

    const width = maxWidth ?? undefined;

    return (
        <>
            {/* Hidden row used only to measure the widest label */}
            <div
                ref={measureRef}
                className="absolute opacity-0 pointer-events-none inline-flex flex-wrap"
                aria-hidden
            >
                {OTHER_TECH_LABELS.map(({ title, link }) => (
                    <TechLabel key={title} title={title} link={link} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:items-end md:justify-end">
                        <TechLabel title="Git" link="https://en.wikipedia.org/wiki/Git" width={width} />
                        <TechLabel title="Next.js" link="https://nextjs.org/" width={width} />
                        <TechLabel title="Node.js" link="https://nodejs.org/en/" width={width} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:items-start">
                        <TechLabel title="Express" link="https://expressjs.com/" width={width} />
                        <TechLabel title="PostgreSQL" link="https://www.postgresql.org/" width={width} />
                        <TechLabel title="MySQL" link="https://www.mysql.com/" width={width} />
                    </div>
                </div>
                <TechLabel title="Linux" link="https://www.linux.org/" width={width} />
            </div>
        </>
    );
}