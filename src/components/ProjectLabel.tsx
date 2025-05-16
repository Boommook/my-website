import clsx from "clsx";

type LabelProps = {
    title: string;
    color: string;
  };

export const ProjectLabel = ({ title, color }: LabelProps) => {
    return (
        <div className={clsx("rounded-md text-center", color, "w-fit px-2 py-1.5 text-white text-xs font-semibold mb-2 mx-1.5")}>
            {title}
        </div>
    )
}
