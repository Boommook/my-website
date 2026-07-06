import { ReactNode, useEffect, useState } from "react";

export const ProjectLabels = ({ labels }: { labels: ReactNode[] }) => {  
    const screenWidth = window.innerWidth;
    const [showLabels, setShowLabels] = useState(5);
    useEffect(() => {
        if (screenWidth < 1400) {
            setShowLabels(3);
        } else if (screenWidth < 1200) {
            setShowLabels(3);
        }
    }, [screenWidth]);
    return (
        <div className="flex justify-center">
            {labels.slice(0, showLabels).map((label, index) => <div key={index}>{label}</div>)}
        </div>
    )
}