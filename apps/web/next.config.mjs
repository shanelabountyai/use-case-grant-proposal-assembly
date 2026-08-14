/** @type {import('next').NextConfig} */
const nextConfig = {
  // @grants/core and @grants/db are workspace TypeScript, not built packages.
  transpilePackages: ["@grants/core", "@grants/db"],
};
export default nextConfig;
