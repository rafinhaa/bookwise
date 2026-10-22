/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  pageExtensions: ["page.tsx", "api.ts"],
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
