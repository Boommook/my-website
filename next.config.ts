import type { NextConfig } from "next";

const isLimey = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "limey";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isLimey ? "/~boommook/out" : "",
  assetPrefix: isLimey ? "/~boommook/out" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;