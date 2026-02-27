import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/djnarqgls/**',
          },
        ],
      },
      experimental: {
        cssChunking: true,
        optimizeCss: true,
        inlineCss: true,
      }
};

export default nextConfig;
