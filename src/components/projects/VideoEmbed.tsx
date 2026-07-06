function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return `https://www.youtube.com/embed/${fromQuery}`;

      const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/);
      if (embedMatch?.[1]) return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }
  } catch {
    return null;
  }

  return null;
}

function toDrivePreviewUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match?.[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

export function isYoutubeUrl(url: string): boolean {
  return toYoutubeEmbedUrl(url) !== null;
}

export const DriveVideoEmbed = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const embedUrl = toDrivePreviewUrl(url);

  return (
    <iframe
      src={embedUrl}
      className={className}
      allow="autoplay; fullscreen"
      allowFullScreen
      title="Google Drive video player"
    />
  );
};

export const YoutubeVideoEmbed = ({
  link,
  className,
}: {
  link: string;
  className?: string;
}) => {
  const embedUrl = toYoutubeEmbedUrl(link);
  if (!embedUrl) return null;

  return (
    <iframe
      src={embedUrl}
      className={className}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      title="YouTube video player"
    />
  );
};
