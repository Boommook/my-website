import type { Metadata } from "next";
import {ArrowBigLeft} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMGD 4300 - A5",
};

export default function A5Page() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
      <div className="grid grid-cols-3">
          <Link href="/imgd_4300" className="col-span-1">
            <ArrowBigLeft className="w-12 h-12 text-gray hover:scale-105 hover:text-tangerine/80 transition-all duration-300" />
          </Link>
          <h1 className="text-gray col-span-1 self-center">A5a: WebGPU App</h1>
        </div>
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
            title="IMGD 4300 A5b"
            src="/imgd_4300/a5b/index.html"
            className="h-full w-full"
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>
      </div>
    </div>
  );
}

