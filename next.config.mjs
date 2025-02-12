/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["img.ophim.live", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
