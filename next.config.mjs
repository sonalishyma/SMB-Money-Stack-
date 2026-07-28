/** @type {import('next').NextConfig} */
const pagesBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

if (pagesBasePath && !pagesBasePath.startsWith("/")) {
  throw new Error("PAGES_BASE_PATH must be empty or begin with a forward slash.");
}

const nextConfig = {
  basePath: pagesBasePath,
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
