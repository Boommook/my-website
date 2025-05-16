import clsx from "clsx";

type LabelProps = {
    title: string;
  };

export const TechLabel = ({ title }: LabelProps) => {
    return (
        <div className={clsx("rounded-xl text-center w-fit px-2.5 py-1 text-lg font-semibold mb-2 mx-1.5 border-2 border-gray-300 bg-gray-200")}>
            <h3>{title}</h3>
        </div>
    )
}
