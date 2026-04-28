import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - this is a valid config property but may not be typed correctly in Next.js 15+ yet
  allowedDevOrigins: ['192.168.254.101', 'localhost'],
};

export default nextConfig;
