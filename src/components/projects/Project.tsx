"use client";
import { ReactNode, useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import { ProjectInfo } from "./ProjectInfo";
import { DriveVideoEmbed, isYoutubeUrl, YoutubeVideoEmbed } from "./VideoEmbed";
import { ProjectLabels } from "./ProjectLabels";
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
  "flex min-w-0 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-gray bg-[#ada38b]/15 shadow-md shadow-gray-600";
const mediaHeight = "h-48 w-full sm:h-56 lg:h-64";

function ProjectCardFooter({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 w-full rounded-b-xl border-t-2 border-tangerine bg-gradient-to-r from-gray/85 via-gray to-gray/85 p-2">
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

  return (
    <div className={`relative ${mediaHeight} overflow-hidden rounded-t-xl bg-gray/30`}>
      {hasVideo ? (
        isYoutubeUrl(video) ? (
          <YoutubeVideoEmbed
            link={video}
            className="absolute inset-0 h-full w-full rounded-t-2xl"
          />
        ) : (
          <DriveVideoEmbed
            url={video}
            className="absolute inset-0 h-full w-full rounded-t-2xl"
          />
        )
      ) : fill ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full rounded-t-2xl object-cover"
        />
      ) : (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-sm"
          />
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <img
              src={image}
              alt={title}
              className="max-h-full max-w-full rounded-t-2xl object-contain"
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

  return (
    <div
      className="group min-w-0 w-full cursor-pointer bg-[#ada38b]/10 perspective-[1200px] transition-transform duration-400 "
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full hover:scale-102 hover:shadow-lg transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className={`${cardShell} [backface-visibility:hidden]`}>
          <ProjectCardFrontMedia image={image} title={title} video={video} fill={fill} />
          <ProjectCardFooter title={title}>
            <ProjectLabels labels={labels} />
          </ProjectCardFooter>
        </div>

        <div
          className={`${cardShell} absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]`}
        >
          <div className={`${mediaHeight} min-w-0 overflow-hidden rounded-t-xl`}>
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
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mx-1.5 flex w-fit items-center justify-center gap-2 rounded-md bg-cyan px-2 py-1 text-lg font-semibold text-silver transition-all duration-400 hover:bg-tangerine"
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
