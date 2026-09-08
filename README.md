This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Static hosting

For Netlify or local root hosting, leave `NEXT_PUBLIC_DEPLOY_TARGET` unset and
run `npm run build`. Publish the generated `out` directory.

For Limey, set `NEXT_PUBLIC_DEPLOY_TARGET=limey` when running `npm run build`.
Upload the contents of `out` to `/~boommook/out` on Limey. Alternatively,
`npm run build:apache` sets the Limey target and copies the export to
`deploy/~boommook/out` for upload.

Public asset URLs use `withBasePath` from `src/lib/paths.ts`. It adds
`/~boommook/out` only for Limey builds. Keep normal Next navigation links
unprefixed; Next handles their configured base path. Rebuild when switching targets.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
