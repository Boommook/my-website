const VideoEmbed = ({ url, className }: { url: string, className: string }) => {
  return (
    <div className="video-container">
      <iframe
        src={url}
        width="640"
        height="480"
        className={className}
        allow="autoplay"
        title="Google Drive Video Player"
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
