"use client";
import { ReactNode, useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import { ProjectInfo } from "./ProjectInfo";
import VideoEmbed from "./VideoEmbed";

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
  const [hovering, setHovering] = useState(false);

  const hasVideo = video !== undefined;

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray shadow-md shadow-gray-600 transition-transform hover:scale-105 hover:shadow-lg"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {!flipped ? (
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray/30 sm:h-56 lg:h-64">
          {hasVideo ? (
            <VideoEmbed
              url={video}
              className="absolute inset-0 h-full w-full object-cover rounded-t-2xl"
            />
          ) : ( fill ? (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover rounded-t-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(!flipped);
              }}
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
                  className="max-h-full max-w-full object-contain rounded-t-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(!flipped);
                  }}
                />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="h-48 w-full min-w-0 overflow-hidden rounded-t-xl sm:h-56 lg:h-64">
          <ProjectInfo
            role={role}
            teamSize={teamSize}
            duration={duration}
            reason={reason}
            description={description}
            flipped={flipped}
            setFlipped={setFlipped}
          />
        </div>
      )}

      <div className="w-full rounded-b-xl border-t-2 border-tangerine bg-gradient-to-r from-gray/85 via-gray to-gray/85 p-2">
        <h2 className="justfiy-center py-2 pb-2 text-center text-2xl font-semibold text-silver">
          {title}
        </h2>

        <div className="flex justify-center">
          {!flipped ? (
            labels.map((label, index) => <div key={index}>{label}</div>)
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1.5 flex w-fit items-center justify-center gap-2 rounded-md bg-cyan px-2 py-1 text-lg font-semibold text-silver transition-colors hover:bg-tangerine"
            >
              <SquareArrowOutUpRight className="w-5 text-gray" />
              <p className="mb-0.5 flex items-center justify-center text-center text-silver">
                Project
              </p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};