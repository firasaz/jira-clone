/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
