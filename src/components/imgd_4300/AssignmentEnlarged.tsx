export type AssignmentEnlargedProps = {
    title: string;
    description: string;
    link: string;
    date: string;
    image: string;
    documentation: string;
}
export const AssignmentEnlarged = ({ title, description, link, date, image, documentation }: AssignmentEnlargedProps) => {
    return (
        <div className="flex flex-col mb-4 items-center justify-center mx-10 md:mx-30">
            <h2 className=" text-gray items-center justify-center">{title}</h2>
        </div>
    )
}