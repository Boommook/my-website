import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/~boommook/out",
  assetPrefix: "/~boommook/out",
  images: {
    unoptimized: true,
  },

};

export default nextConfig;
