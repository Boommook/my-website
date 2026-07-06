import { ReactNode, useEffect, useState } from "react";

export const ProjectLabels = ({ labels }: { labels: ReactNode[] }) => {  
    const [width, setWidth] = useState<number | null>(null);

    const [showLabels, setShowLabels] = useState(5);
    useEffect(() => {
        setWidth(window.innerWidth);
        if (width < 1400) {
            setShowLabels(3);
        } else if (width < 1200) {
            setShowLabels(3);
        }
    }, [width]);
    return (
        <div className="flex justify-center">
            {labels.slice(0, showLabels).map((label, index) => <div key={index}>{label}</div>)}
        </div>
    )
}