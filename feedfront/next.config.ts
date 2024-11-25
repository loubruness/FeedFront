import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    API_HOST: 'http://localhost:3000',
  },
};

export default nextConfig;