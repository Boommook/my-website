import { ReactNode } from "react";

export const ProjectLabels = ({ labels }: { labels: ReactNode[] }) => {
    return (
        <div className="flex justify-center">
            {labels.slice(0, 3).map((label, index) => <div key={index}>{label}</div>)}
        </div>
    )
}
