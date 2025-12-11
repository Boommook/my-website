import clsx from "clsx";

type LabelProps = {
    title: string;
    color: string;
  };

export const ProjectLabel = ({ title, color }: LabelProps) => {
    return (
            <div 
            style={{boxShadow: "inset 0.005rem 0.005rem 0.2vh #333333, inset -0.01rem -0.01rem 0.5vh #333333"}}
            className={clsx("rounded-md text-center", color, "w-fit px-2 py-1.5  flex justify-center items-center text-xs font-semibold mb-2 mx-1.5")}>
                <p className="text-silver mb-0.5">{title}</p>
            </div>
    )
}
