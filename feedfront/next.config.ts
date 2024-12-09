import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    API_HOST: 'http://localhost:3001',
  },
};

export default nextConfig;