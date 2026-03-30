import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMGD 4300 - A3",
};

export default function A3Page() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
        <h1 className="text-gray">A3: WebGPU Intro</h1>
        <p className="mt-3 text-dark-turquoise">
          Embedded interactive assignment. If it doesn't load, your browser
          may not support WebGPU (try Chrome/Edge), or the required local files
          aren't in place yet.
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <div
          className="w-full overflow-hidden rounded-2xl border-2 border-gray shadow-md shadow-gray-600"
          style={{ height: "min(80vh, 900px)" }}
        >
          <iframe
            title="IMGD 4300 A3"
            src="/imgd_4300/a3/index.html"
            className="h-full w-full"
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>
      </div>
    </div>
  );
}

