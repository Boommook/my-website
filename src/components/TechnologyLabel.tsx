import clsx from "clsx";

type LabelProps = {
    title: string;
    link?: string;
    /** when set, the label uses this width so all labels in a group can match the widest */
    width?: number;
  };

export const TechLabel = ({ title, link, width }: LabelProps) => {
    return (
        <div
            data-tech-label
            className={clsx("rounded-xl hover:cursor-pointer text-center px-1.5 py-1 text-xs md:text-lg font-semibold mb-2 mx-1 md:mx-1.5 border-2 border-tangerine/40 bg-tangerine/20 text-gray", width == null ? "w-fit" : "flex justify-center items-center")}
            style={width != null ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
            onClick={() => link && window.open(link, "_blank")}>
            <h3>{title}</h3>
        </div>
    )
}
