export const basePath =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "limey" ? "/~boommook/out" : "";

export function withBasePath(path: string): string {
  if (path.startsWith("http")) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
