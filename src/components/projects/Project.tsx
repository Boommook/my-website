"use client";
import { KeyboardEvent, ReactNode, useId, useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import { ProjectInfo } from "./ProjectInfo";
import { DriveVideoEmbed, isYoutubeUrl, YoutubeVideoEmbed } from "./VideoEmbed";
import { ProjectLabels } from "./ProjectLabels";
import { withBasePath } from "@/lib/paths";
export type ProjectProps = {
  image: string;
  title: string;
  labels: ReactNode[];
  description: string;
  filters: string[];
  link?: string;
  role?: string;
  teamSize?: number;
  duration?: string;
  reason?: string;
  video?: string;
  fill?: boolean;
};

const cardShell =
  "project-card-face flex min-w-0 w-full flex-col items-center justify-start overflow-hidden rounded-2xl border-2 border-gray bg-gray shadow-md shadow-gray-600";
const mediaHeight = "h-48 w-full sm:h-56 lg:h-64";

function ProjectCardFooter({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="project-card-footer min-w-0 w-full border-t-2 border-tangerine p-2">
      <h2 className="break-words justify-center py-2 pb-2 text-center text-2xl font-semibold text-silver">
        {title}
      </h2>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

function ProjectCardFrontMedia({
  image,
  title,
  video,
  fill,
}: Pick<ProjectProps, "image" | "title" | "video" | "fill">) {
  const hasVideo = video !== undefined;
  const imageSrc = withBasePath(image);

  return (
    <div className={`relative ${mediaHeight} overflow-hidden bg-gray/30`}>
      {hasVideo ? (
        isYoutubeUrl(video) ? (
          <YoutubeVideoEmbed
            link={video}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <DriveVideoEmbed
            url={video}
            className="absolute inset-0 h-full w-full"
          />
        )
      ) : fill ? (
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="project-card-blur-bg absolute inset-0 h-full w-full object-cover opacity-60 blur-sm"
            loading="lazy"
            decoding="async"
          />
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <img
              src={imageSrc}
              alt={title}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </>
      )}
    </div>
  );
}

export const Project = ({
  image,
  title,
  labels,
  description,
  filters,
  link,
  role,
  teamSize,
  duration,
  reason,
  video,
  fill,
}: ProjectProps) => {
  const [flipped, setFlipped] = useState(false);
  const detailsId = useId();
  const toggle = () => setFlipped((value) => !value);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="project-card-scene group min-w-0 w-full cursor-pointer bg-[#ada38b]/10 transition-transform duration-400 hover:scale-102"
      role="group"
      tabIndex={0}
      aria-controls={detailsId}
      aria-label={`${title} project card. ${flipped ? "Details shown" : "Press Enter or Space to show details"}.`}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <div
        className={`project-card-flip relative w-full hover:shadow-lg transition-transform duration-700 ease-in-out ${
          flipped ? "is-flipped" : ""
        }`}
      >
        <div className={cardShell}>
          <ProjectCardFrontMedia image={image} title={title} video={video} fill={fill} />
          <ProjectCardFooter title={title}>
            <ProjectLabels labels={labels} />
          </ProjectCardFooter>
        </div>

        <div id={detailsId} aria-hidden={!flipped} className={`${cardShell} project-card-face-back absolute inset-0`}>
          <div className={`${mediaHeight} min-w-0 overflow-hidden`}>
            <ProjectInfo
              role={role ?? ""}
              teamSize={teamSize ?? 0}
              duration={duration ?? ""}
              reason={reason ?? ""}
              description={description}
            />
          </div>
          <ProjectCardFooter title={title}>
            <a
              href={link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              tabIndex={flipped && link ? 0 : -1}
              aria-label={`Open ${title} project in a new tab`}
              className="mx-1.5 flex w-fit items-center justify-center gap-2 rounded-md bg-cyan px-2 py-1 text-lg font-semibold text-silver transition-all duration-400 hover:bg-tangerine focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tangerine"
            >
              <SquareArrowOutUpRight className="w-5 text-gray" />
              <p className="mb-0.5 flex items-center justify-center text-center text-silver">
                Project
              </p>
            </a>
          </ProjectCardFooter>
        </div>
      </div>
    </div>
  );
};
