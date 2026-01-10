import clsx from "clsx";

type LabelProps = {
    title: string;
    link?: string;
  };

export const TechLabel = ({ title, link }: LabelProps) => {
    return (
        <div className={clsx("rounded-xl hover:cursor-pointer text-center w-fit px-2.5 py-1 text-xs md:text-lg font-semibold mb-2 mx-1 md:mx-1.5 border-2 border-tangerine/40 bg-tangerine/20 text-gray")}
        onClick={() => window.open(link, "_blank")}>
            <h3>{title}</h3>
        </div>
    )
}
